import type { MetaFunction, LinksFunction } from 'remix';

import stylesUrl from '../styles/index.css';
import { Outlet } from 'react-router-dom';

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
    <div className="container grid gap-4 mt-4 justify-items-center">
      <header className="text-2xl">Very Short</header>
      <p>Shorten any URL in one simple step...</p>
      <Outlet />
      <footer className="container flex justify-center p-4">
        <p>
          source available on{' '}
          <a href="https://gtihub/03c/very-short" target="_blank">
            GitHub
          </a>{' '}
          | terms
        </p>
      </footer>
    </div>
  );
}
