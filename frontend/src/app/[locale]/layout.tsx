import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {notFound} from "next/navigation";
import {ThemeProvider} from "@/components/shared/theme-provider";
import MainLayout from "@/components/layout/MainLayout";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import "./globals.css";
import {routing} from "@/i18n/routing";
import {GlobalDataProvider} from "@/contexts/GlobalProvider";
import {singleTypeService} from "@/services/single-type.service";
import {getValidOgType} from "@/lib/seoMeta";

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});

export const generateMetadata = async ({params}: { params: { locale: string }; }): Promise<Metadata> => {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resSiteSetting = await singleTypeService.getSiteSetting(locale);
  const siteSetting = resSiteSetting?.data || [];

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const defaultSeo = siteSetting?.defaultSeo || {};

  return {
    title: defaultSeo.metaTitle,
    description: defaultSeo.metaDescription,
    keywords: defaultSeo.keywords,
    robots: defaultSeo.metaRobots,
    alternates: {
      canonical: defaultSeo.canonicalURL,
      languages: {
        en: `${baseUrl}/`,
        vi: `${baseUrl}/vi/`,
        "x-default": `${baseUrl}/`,
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
    // Có thể thêm structuredData nếu Next.js support (hoặc render riêng trong <script type="application/ld+json">)
  };
};

export default async function LocaleLayout({
                                             children,
                                             params
                                           }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resSiteSetting = await singleTypeService.getSiteSetting(locale);
  const siteSetting = resSiteSetting?.data || [];

  return (
    <html lang={locale} suppressHydrationWarning>
    <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <meta name="theme-color" content="#000000"/>
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <NextIntlClientProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <GlobalDataProvider value={{siteSetting}}>
          <MainLayout>{children}</MainLayout>
        </GlobalDataProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
