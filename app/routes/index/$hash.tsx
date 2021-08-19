import type { LoaderFunction } from 'remix';
import { redirect } from 'remix';
import Hashids from 'hashids';
import Database from '../../database';

export let loader: LoaderFunction = async ({ params }) => {
  const hash = params.hash;

  const hasher = new Hashids(
    process.env.HASH_SALT || 'devsalt',
    parseInt(process.env.HASH_LENGTH || '5', 10)
  );

  let id = hasher.decode(hash);

  const { data, error } = await Database.from('urls')
    .select('redirect_to')
    .eq('id', id);

  return redirect(data && data[0]['redirect_to']);
};

export default function Index() {
  return <></>;
}
