import './globals.css';

import parse from 'html-react-parser';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import NextTopLoader from 'nextjs-toploader';

import MainLayout from '@/components/layout/MainLayout';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { GlobalDataProvider } from '@/contexts/GlobalProvider';
import { routing } from '@/i18n/routing';
import { getValidOgType } from '@/lib/seoMeta';
import { singleTypeService } from '@/services/single-type.service';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

/** No-flash theme script: gắn class light/dark sớm ngay từ head */
function ThemeNoFlashScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  try {
    var key = 'theme';
    var stored = localStorage.getItem(key);
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = stored === 'light' || stored === 'dark' ? stored : (systemDark ? 'dark' : 'light');
    var root = document.documentElement;
    root.classList.remove('light','dark');
    root.classList.add(resolved);
  } catch (e) {}
})();`,
      }}
    />
  );
}

export const generateMetadata = async ({
                                         params,
                                       }: {
  params: { locale: string };
}): Promise<Metadata> => {
  const resSiteSetting = await singleTypeService.getSiteSetting();
  const siteSetting = resSiteSetting?.data || [];

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  const defaultSeo = siteSetting?.defaultSeo || {};
  const isProd = process.env.NODE_ENV === 'production';

  return {
    title: defaultSeo.metaTitle,
    description: defaultSeo.metaDescription,
    keywords: defaultSeo.keywords,
    robots: isProd ? defaultSeo.metaRobots : 'noindex, nofollow',
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: defaultSeo.canonicalURL,
      languages: {
        en: `${baseUrl}/`,
        vi: `${baseUrl}/vi/`,
        'x-default': `${baseUrl}/`,
      },
    },
    openGraph: {
      title: defaultSeo.openGraph?.ogTitle,
      description: defaultSeo.openGraph?.ogDescription,
      url: defaultSeo.openGraph?.ogUrl,
      type: getValidOgType(defaultSeo.openGraph?.ogType),
      images: defaultSeo.openGraph?.ogImage
        ? [
          {
            url: `${baseUrl}${defaultSeo.openGraph.ogImage.url}`,
            width: defaultSeo.openGraph.ogImage.width,
            height: defaultSeo.openGraph.ogImage.height,
            alt: defaultSeo.openGraph.ogImage.alternativeText || defaultSeo.openGraph.ogTitle,
          },
        ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultSeo.openGraph?.ogTitle,
      description: defaultSeo.openGraph?.ogDescription,
      images: defaultSeo.openGraph?.ogImage ? [`${baseUrl}${defaultSeo.openGraph.ogImage.url}`] : [],
    },
  };
};

export default async function LocaleLayout({
                                             children,
                                             params: { locale },
                                           }: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resSiteSetting = await singleTypeService.getSiteSetting();
  const siteSetting = resSiteSetting?.data || [];

  return (
    <html lang={locale} suppressHydrationWarning>
    <head>
      {/* Giúp browser chọn palette phù hợp và tránh nháy */}
      <meta name="color-scheme" content="light dark" />
      <ThemeNoFlashScript />
      {!!siteSetting?.scripts?.headScripts && parse(siteSetting.scripts.headScripts.trim())}
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <NextIntlClientProvider locale={locale}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <GlobalDataProvider value={{ siteSetting }}>
          <MainLayout>
            <NextTopLoader showSpinner={false} />
            {children}
          </MainLayout>
        </GlobalDataProvider>
      </ThemeProvider>
    </NextIntlClientProvider>

    {!!siteSetting?.scripts?.bodyScripts && parse(siteSetting?.scripts?.bodyScripts.trim())}
    </body>
    </html>
  );
}
