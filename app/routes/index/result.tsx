import { useNavigate } from 'react-router-dom';
import { LoaderFunction, redirect, json, useRouteData } from 'remix';
import { getSession, commitSession } from '../../session';
import Button from '../components/button';

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get('Cookie'));
  let url = session.get('url') || null;

  //redirect to the home page if no url has been generated
  if (url === null) {
    return redirect('/');
  }

  return json(
    { url },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
};

export default function Index() {
  let { url } = useRouteData();
  let navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="m-4 p-4 flex justify-center bg-blue-200">
        Your new Very Short URL is:&nbsp;
        <a href={url} target="_blank">
          {url}
        </a>
      </div>
      <Button type="button" onClick={goBack}>
        Another?
      </Button>
    </>
  );
}
