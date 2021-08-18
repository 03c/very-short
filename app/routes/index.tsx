import type { MetaFunction, LinksFunction } from 'remix';
import { Form } from 'remix';

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

export default function Index() {
  return (
    <>
      <Form
        method="post"
        className="container grid gap-4 grid-cols-1 grid-flow-row mt-4 justify-items-center"
      >
        <header className="text-2xl">Very Short</header>
        <p>Shorten any URL in one simple step...</p>
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Shorten your long URL"
            className="m-4 mr-0 p-4 w-2/6"
          ></input>
          <button type="submit" className="m-4 ml-0 p-4 pl-6 pr-6 bg-green-400">
            Shorten
          </button>
        </div>
      </Form>
    </>
  );
}
