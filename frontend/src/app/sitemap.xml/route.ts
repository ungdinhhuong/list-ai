import { type NextRequest } from 'next/server';

import { BASE_URL, STRAPI_URL } from '@/constants/env';

const LOCALES = ['en', 'vi'];
const DEFAULT_LOCALE = 'en';

// Cache sitemap trong 1 giờ
let cachedSitemap: string | null = null;
let cacheTime = 0;
const CACHE_DURATION_MS = 1000 * 60 * 60;

// Gọi API có populate=localizations
async function fetchAllPaginated(endpoint: string): Promise<any[]> {
  let page = 1;
  const limit = 100;
  const all: any[] = [];

  while (true) {
    const url = `${STRAPI_URL}${endpoint}?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=localizations`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    const json = await res.json();
    if (!res.ok || !json.data) {
      console.error('Strapi error:', json.error || json);
      break;
    }

    all.push(...json.data);
    const pageCount = json.meta?.pagination?.pageCount || 1;
    if (page >= pageCount) break;
    page++;
  }

  return all;
}

async function fetchAllTools() {
  return fetchAllPaginated(`/api/tools`);
}

function normalizeLocale(raw: string): string {
  return raw.toLowerCase().split('-')[0]; // ví dụ: 'vi-VN' => 'vi'
}

function createUrl(locale: string, path: string) {
  return locale === DEFAULT_LOCALE ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;
}

export async function GET(req: NextRequest) {
  const now = Date.now();
  if (cachedSitemap && now - cacheTime < CACHE_DURATION_MS) {
    return new Response(cachedSitemap, {
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  const tools = await fetchAllTools();

  const staticPaths = ['', '/about', '/policy'];
  const dynamicPaths: { [key: string]: string[] } = {};
  for (const locale of LOCALES) dynamicPaths[locale] = [];

  // Duyệt qua tools chính
  for (const tool of tools) {
    const mainLocale = normalizeLocale(tool.locale);
    if (LOCALES.includes(mainLocale)) {
      dynamicPaths[mainLocale].push(`/ai/${tool.slug}`);
    }

    // Duyệt qua localizations
    const locals = tool.localizations || [];
    for (const l of locals) {
      const loc = normalizeLocale(l.locale);
      if (LOCALES.includes(loc)) {
        dynamicPaths[loc].push(`/ai/${l.slug}`);
      }
    }
  }

  // Sitemap entries
  const entries: string[] = [];

  for (const locale of LOCALES) {
    for (const path of [...staticPaths, ...dynamicPaths[locale]]) {
      const url = createUrl(locale, path);
      entries.push(`
        <url>
          <loc>${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries.join('')}
</urlset>`;

  cachedSitemap = sitemap;
  cacheTime = now;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
