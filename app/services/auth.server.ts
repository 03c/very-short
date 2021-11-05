import { Authenticator, Auth0Strategy, Auth0StrategyOptions } from 'remix-auth';
import { session } from './session';
import { User, login } from '~/models/user';

export let authenticator = new Authenticator<User>(session);

if (!process.env.AUTH0_DOMAIN) {
  throw new Error('Missing AUTH0_DOMAIN env');
}

if (!process.env.AUTH0_CLIENT_ID) {
  throw new Error('Missing AUTH0_CLIENT_ID env');
}

if (!process.env.AUTH0_CLIENT_SECRET) {
  throw new Error('Missing AUTH0_CLIENT_SECRET env');
}

const auth0StrategyOptions: Auth0StrategyOptions = {
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: `http://${process.env.DOMAIN}/auth/auth0/callback`,
};

authenticator.use(
  new Auth0Strategy(auth0StrategyOptions, async (_, __, ___, profile) =>
    login(profile.emails[0].value)
  )
);
