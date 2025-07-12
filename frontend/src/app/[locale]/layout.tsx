import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {notFound} from "next/navigation";
import {ThemeProvider} from "@/components/shared/theme-provider";
import MainLayout from "@/components/layout/MainLayout";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import "./globals.css";
import {routing} from "@/i18n/routing";

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});

export const generateMetadata = async ({params,}: { params: { locale: string }; }): Promise<Metadata> => {
  const {locale} = await params;
  const baseUrl = "https://ontoolaz.com";

  return {
    title: "Ontoolaz",
    description: "Ontoolaz - Discover the best AI tools",
    alternates: {
      languages: {
        en: `${baseUrl}/`,
        vi: `${baseUrl}/vi/`,
        "x-default": `${baseUrl}/`,
      },
    },
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
        <MainLayout>{children}</MainLayout>
      </ThemeProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
