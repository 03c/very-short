import { LoaderFunction, redirect } from 'remix';
import { authenticator } from '../services/auth.server';

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  if (user) return redirect('/');
  return authenticator.authenticate('auth0', request);
};

export default function Login() {
  return <></>;
}
