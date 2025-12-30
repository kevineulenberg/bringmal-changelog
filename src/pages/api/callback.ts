import type { APIRoute } from 'astro';
import { AuthorizationCode } from 'simple-oauth2';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const host = request.headers.get('host');
  // Determine protocol (vercel usually handles this, but basic check)
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const redirect_uri = import.meta.env.OAUTH_REDIRECT_URI || `${protocol}://${host}/api/callback`;

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

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

  try {
    const accessToken = await client.getToken({
      code,
      redirect_uri,
    });

    const token = accessToken.token.access_token;

    const html = `
      <!doctype html>
      <html>
      <body>
        <script>
          const message = 'authorization:github:success:' + JSON.stringify({
            token: '${token}',
            provider: 'github'
          });
          window.opener.postMessage(message, '*');
          window.close();
        </script>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Access Token Error', error);
    return new Response('Authentication failed', { status: 500 });
  }
};
