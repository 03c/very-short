import {
  MetaFunction,
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from 'remix';
import { useNavigate } from 'react-router';
import { getSession, commitSession } from '../services/session';
import Hashids from 'hashids';
import Database from '../services/database';
import Button from '../components/button';
import validator from 'validator';
import { authenticator } from '~/services/auth.server';
import { User } from '~/models/user';

export let meta: MetaFunction = () => {
  return {
    title: 'vry.sh - your simple URL shortener',
    description: 'Welcome to vry.sh, the simple URL shortener',
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);

  let session = await getSession(request.headers.get('Cookie'));
  let error = session.get('error') || null;

  return { user, error };
};

export let action: ActionFunction = async ({ request }) => {
  // get existing session cookie
  let session = await getSession(request.headers.get('Cookie'));

  // get url
  let url = new URLSearchParams(await request.text()).get('url') || '';

  //Validation schema
  const isValid = await validator.isURL(url);

  //return error if not valid
  if (!isValid) {
    return json({ error: `Please enter a valid URL.` });
  }

  //assume http if not specified
  if (!url.startsWith('http')) {
    url = `http://${url}`;
  }

  let result = await Database.redirect.create({
    data: {
      redirect_to: url,
    },
  });

  //get hash from db index
  const hasher = new Hashids(
    process.env.HASH_SALT || 'devsalt',
    parseInt(process.env.HASH_LENGTH || '5', 10)
  );

  let hash = hasher.encode(result.id);

  //update the database with the hash
  result = await Database.redirect.update({
    where: { id: result.id },
    data: { hash: hash },
  });

  session.flash('url', `https://${process.env.DOMAIN}/${hash}`);

  return redirect('/result', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Index() {
  let loaderData = useLoaderData<{ user: User }>();
  let data = useActionData();
  let navigate = useNavigate();
  return (
    <>
      <Form method="post" className="w-1/2">
        {data && (
          <div className="bg-red w-full flex justify-center p-4 mt-4 mb-4">
            {data.error}
          </div>
        )}
        <div className="w-full flex justify-center">
          <input
            type="text"
            name="url"
            placeholder="Shorten your long URL"
            className="p-4 w-full"
          ></input>
          <Button type="submit">Shorten</Button>
        </div>
      </Form>
      {loaderData.user && <div>Logged In: {loaderData.user.email}</div>}
      {!loaderData.user && (
        <Button
          type="button"
          onClick={function () {
            navigate('/login/');
          }}
        >
          Login
        </Button>
      )}
    </>
  );
}
