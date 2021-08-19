import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useRouteData,
} from 'remix';
import { getSession, commitSession } from '../../session';
import Hashids from 'hashids';
import Database from '../../database';
import Button from '../components/button';
import * as yup from 'yup';

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

  // get the form body out of the request using standard web APIs on the server
  let body = new URLSearchParams(await request.text());

  //Validation schema
  let schema = yup.object().shape({
    url: yup.string().url().required(),
  });

  //check schema
  const isValid = await schema.isValid(body);

  //return error if not valid
  if (!isValid) {
    session.flash('error', `Please enter a valid URL`);
    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  // get the url from the body
  let url = body.get('url');

  const { data, error } = await Database.from('urls').insert([
    { redirect_to: url },
  ]);

  //get hash from db index
  const hasher = new Hashids(
    process.env.HASH_SALT || 'devsalt',
    parseInt(process.env.HASH_LENGTH || '5', 10)
  );

  let hash = hasher.encode(data && data[0]['id']);

  session.flash('url', `https://${process.env.DOMAIN}/${hash}`);

  return redirect('/result', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Index() {
  let { error } = useRouteData();
  return (
    <>
      <Form method="post" className="w-1/2">
        {error && (
          <div className="bg-red-300 w-full flex justify-center p-4 mt-4 mb-4">
            {error}
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
