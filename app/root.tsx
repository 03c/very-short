import type { LinksFunction } from 'remix';
import { Meta, Links, Scripts, LiveReload, useCatch } from 'remix';
import { Outlet } from 'react-router-dom';

import stylesUrl from './styles/global.css';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body className="bg-yellow">
        <div className="container grid gap-4 mt-4 justify-items-center">
          <header className="text-2xl">Very Short</header>
          <p>Shorten any URL in one simple step...</p>
          {children}
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

        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
