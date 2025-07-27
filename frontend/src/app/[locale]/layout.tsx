import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'

import MainLayout from '@/components/layout/MainLayout'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { GlobalDataProvider } from '@/contexts/GlobalProvider'
import { routing } from '@/i18n/routing'
import { getValidOgType } from '@/lib/seoMeta'
import { singleTypeService } from '@/services/single-type.service'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const generateMetadata = async ({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> => {
  const resSiteSetting = await singleTypeService.getSiteSetting()
  const siteSetting = resSiteSetting?.data || []

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const defaultSeo = siteSetting?.defaultSeo || {}
  const isProd = process.env.NODE_ENV === 'production'

  return {
    title: defaultSeo.metaTitle,
    description: defaultSeo.metaDescription,
    keywords: defaultSeo.keywords,
    robots: isProd ? defaultSeo.metaRobots : 'noindex, nofollow',
    // Icons và manifest
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
    // Canonical và alternate languages
    alternates: {
      canonical: defaultSeo.canonicalURL,
      languages: {
        en: `${baseUrl}/`,
        vi: `${baseUrl}/vi/`,
        'x-default': `${baseUrl}/`,
      },
    },
    // OpenGraph
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
    // Twitter card (optional)
    twitter: {
      card: 'summary_large_image',
      title: defaultSeo.openGraph?.ogTitle,
      description: defaultSeo.openGraph?.ogDescription,
      images: defaultSeo.openGraph?.ogImage
        ? [`${baseUrl}${defaultSeo.openGraph.ogImage.url}`]
        : [],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const resSiteSetting = await singleTypeService.getSiteSetting()
  const siteSetting = resSiteSetting?.data || []

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <GlobalDataProvider value={{ siteSetting }}>
              <MainLayout>{children}</MainLayout>
            </GlobalDataProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
