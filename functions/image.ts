import { Context } from 'https://edge.netlify.com';

export default async (req: Request, ctx: Context) => {
  const isDev = Deno.env.get('NETLIFY_DEV') === 'true';
  const url = new URL(req.url);
  const filename = url.pathname.replace('/image/', '');
  if (isDev) return ctx.rewrite(`/images/${filename}`);
  const width = url.searchParams.get('w') ?? '200';
  const response = await fetch(
    makeCloudURL(`${ctx.site.url}/images/${filename}`, width),
    {
      headers: req.headers,
    }
  );
  return new Response(response.body, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
};

const makeCloudURL = (path: string, width: string) =>
  `https://res.cloudinary.com/${Deno.env.get(
    'CLOUDINARY_KEY'
  )}/image/fetch/f_auto,q_80,w_${width}/${path}`;
