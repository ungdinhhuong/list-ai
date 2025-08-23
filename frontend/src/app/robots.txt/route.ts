// export async function GET() {
//   const isProd = process.env.NODE_ENV === 'production';
//
//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ontoolaz.com';
//
//   const content = [
//     'User-agent: *',
//     isProd ? 'Disallow:' : 'Disallow: /',
//     !isProd && 'Noindex: /',
//     `Sitemap: ${baseUrl}/sitemap.xml`,
//   ]
//     .filter(Boolean) // loại bỏ dòng `false` khi không phải staging
//     .join('\n');
//
//   return new Response(content, {
//     headers: {
//       'Content-Type': 'text/plain',
//     },
//   });
// }


export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ontoolaz.com';

  const content = [
    'User-agent: *',
    'Disallow:', // không chặn gì cả
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
