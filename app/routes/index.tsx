import {
  MetaFunction,
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
} from 'remix';
import { getSession, commitSession } from '../session';
import Hashids from 'hashids';
import Database from '../database';
import Button from '../components/button';
import validator from 'validator';

export let meta: MetaFunction = () => {
  return {
    title: 'vry.sh - your simple URL shortener',
    description: 'Welcome to vry.sh, the simple URL shortener',
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get('Cookie'));
  let error = session.get('error') || null;

  return json(
    { error },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
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
  let data = useActionData();
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
    </>
  );
}
