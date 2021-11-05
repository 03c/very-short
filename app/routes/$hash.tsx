import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';
import Hashids from 'hashids';
import Database from '../database';

export let loader: LoaderFunction = async ({ params }) => {
  const hash = params.hash || '';

  const hasher = new Hashids(
    process.env.HASH_SALT || 'devsalt',
    parseInt(process.env.HASH_LENGTH || '5', 10)
  );

  let id = hasher.decode(hash)[0] as number;

  const result = await Database.redirect.findUnique({
    where: { id: id },
  });

  if (result?.redirect_to === null) {
    redirect('/404');
  }

  return redirect((result && result.redirect_to) || '');
};

export default function Index() {
  return <></>;
}
