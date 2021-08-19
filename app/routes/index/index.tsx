import { ActionFunction, Form, redirect } from 'remix';
import { getSession, commitSession } from '../../session';
import Hashids from 'hashids';
import Database from '../../database';
import Button from '../components/button';

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

  return redirect('/result', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Index() {
  return (
    <Form method="post" className="w-full">
      <div className="w-full flex justify-center">
        <input
          type="text"
          name="url"
          placeholder="Shorten your long URL"
          className="m-4 mr-0 p-4 w-2/6"
        ></input>
        <Button type="submit">Shorten</Button>
      </div>
    </Form>
  );
}
