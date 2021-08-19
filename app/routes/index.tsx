import type {
  MetaFunction,
  LinksFunction,
  ActionFunction,
  LoaderFunction,
} from 'remix';
import { Form, redirect, json, useRouteData } from 'remix';
import Hashids from 'hashids';
import { getSession, commitSession } from '../session';
import Database from '../database';

import stylesUrl from '../styles/index.css';

export let meta: MetaFunction = () => {
  return {
    title: 'vry.sh - your simple URL shortener',
    description: 'Welcome to vry.sh, the simple URL shortener',
  };
};

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get('Cookie'));
  let url = session.get('url') || null;

  console.log(url);

  return json(
    { url },
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

  // get the url from the body
  let url = body.get('url');

  //TODO: Validation!

  const { data, error } = await Database.from('urls').insert([
    { redirect_to: url },
  ]);

  const hasher = new Hashids(
    process.env.HASH_SALT || 'devsalt',
    parseInt(process.env.HASH_LENGTH || '5', 10)
  );

  let hash = hasher.encode(data && data[0]['id']);

  session.flash('url', `https://${process.env.DOMAIN}/${hash}`);

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Index() {
  let { url } = useRouteData();

  

  return (
    <>
      <Form
        method="post"
        className="container grid gap-4 grid-cols-1 grid-flow-row mt-4 justify-items-center"
      >
        <header className="text-2xl">Very Short</header>
        <p>Shorten any URL in one simple step...</p>
        {!url && (
          <>
            <div className="w-full flex justify-center">
              <input
                type="text"
                name="url"
                placeholder="Shorten your long URL"
                className="m-4 mr-0 p-4 w-2/6"
              ></input>
              <button
                type="submit"
                className="m-4 ml-0 p-4 pl-6 pr-6 bg-green-400"
              >
                Shorten
              </button>
            </div>
          </>
        )}
        {url && (
          <>
            <div className="m-4 p-4 flex justify-center bg-blue-200">
              Your new Very Short URL is:&nbsp;
              <a href={url} target="_blank">
                {url}
              </a>
            </div>
            <button
              type="button"
              className="m-4 p-4 pl-6 pr-6 bg-green-400"
              onClick={refresh}
            >
              Another?
            </button>
          </>
        )}
      </Form>
    </>
  );
}
