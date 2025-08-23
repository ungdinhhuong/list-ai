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


// app/robots/route.ts
export const runtime = 'edge';

export async function GET() {
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ontoolaz.com';

  // Các đường dẫn KHÔNG nên index
  const disallowInProd = [
    '/_next/',            // toàn bộ asset build của Next.js
    '/_next/static/',     // fonts, js, map...
    '/_next/image',       // image optimizer endpoint
    '/favicon.ico',
    '/site.webmanifest',
    '/robots.txt',        // chính nó
    '/api/',              // API routes (nếu có)
    '/404', '/500',       // error pages
  ];

  const lines = [
    'User-agent: *',
    isProd ? '' : 'Disallow: /', // chặn toàn site khi không phải production
    ...(isProd ? disallowInProd.map(p => `Disallow: ${p}`) : []),
    // Gợi ý: nếu bạn có trang private, thêm vào đây theo dạng Disallow: /duong-dan
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].filter(Boolean);

  const content = lines.join('\n');

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

