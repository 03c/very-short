import { createCookieSessionStorage } from 'remix';

export let session = createCookieSessionStorage({
  cookie: {
    name: '__session',
    domain:
      process.env.NODE_ENV === 'development'
        ? 'localhost'
        : process.env.DOMAIN || 'vry.sh',
    expires: new Date(Date.now() + 60),
    httpOnly: true,
    maxAge: 60,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.COOKIE_SECRET || 'devsecret'],
    secure: true,
  },
});

export let { getSession, commitSession, destroySession } = session;
