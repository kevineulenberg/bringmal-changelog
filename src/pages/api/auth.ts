import type { APIRoute } from 'astro';
import { AuthorizationCode } from 'simple-oauth2';

export const prerender = false;

export const GET: APIRoute = async ({ redirect }) => {
  const client = new AuthorizationCode({
    client: {
      id: import.meta.env.OAUTH_CLIENT_ID,
      secret: import.meta.env.OAUTH_CLIENT_SECRET,
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
      authorizePath: '/login/oauth/authorize',
    },
  });

  const authorizationUri = client.authorizeURL({
    redirect_uri: import.meta.env.OAUTH_REDIRECT_URI || 'https://bringmal-changelog.vercel.app/api/callback', // Fallback or env
    scope: 'repo,user',
    state: 'random-string-here', // In prod, use a random string
  });

  return redirect(authorizationUri);
};
