import type { Metadata } from 'next'

import { OgType, StrapiImage, StrapiSeoToMetadataOpts, validOgTypes } from '@/types/seo.type'

type SeoMetaOptions = Omit<StrapiSeoToMetadataOpts, 'defaultSeo'> & {
  // Đã bỏ pageNumber và totalPages vì không còn dùng
}

export function getValidOgType(type?: string): OgType {
  if (type && validOgTypes.includes(type as OgType)) {
    return type as OgType
  }
  return 'website'
}

export function seoMeta({
                          seo,
                          siteUrl,
                          path = '/',
                        }: SeoMetaOptions): Metadata {
  const _siteUrl = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://ontoolaz.com'

  const defaultTitle = 'Ontoolaz - Discover the best AI tools'
  const defaultDesc = 'Explore the latest and best AI tools for your business and creativity at Ontoolaz.'
  const defaultImage = `${_siteUrl}/og-image.png`
  const defaultKeywords = ['AI', 'AI tools', 'Ontoolaz']
  const defaultRobots = { index: false, follow: false }

  const url = _siteUrl + path

  // Keywords: xử lý từ chuỗi thành array
  let keywords: string[] = defaultKeywords
  if (seo?.keywords) {
    keywords = seo.keywords
      .split(',')
      .map(kw => kw.trim())
      .filter(Boolean)
  }

  // Robots
  let robots = defaultRobots
  if (seo?.metaRobots) {
    const robotStr = seo.metaRobots.toLowerCase()
    robots = {
      index: robotStr.includes('index'),
      follow: robotStr.includes('follow'),
    }
  }

  // Hàm xử lý ảnh
  const getImageUrl = (img?: StrapiImage) => {
    if (!img?.url) return defaultImage
    return img.url.startsWith('http') ? img.url : _siteUrl + img.url
  }

  const metaImage = seo?.metaImage || seo?.openGraph?.ogImage
  const openGraphImage = getImageUrl(metaImage)

  const ogTitle = seo?.openGraph?.ogTitle || seo?.metaTitle || defaultTitle
  const ogDesc = seo?.openGraph?.ogDescription || seo?.metaDescription || defaultDesc
  const canonical = seo?.canonicalURL || url

  // Chỉ dùng canonical, bỏ prev/next
  const alternates: Metadata['alternates'] = {
    canonical,
  }

  // Structured Data
  let structuredData: string | undefined
  if (seo?.structuredData) {
    structuredData = typeof seo.structuredData === 'string'
      ? seo.structuredData
      : JSON.stringify(seo.structuredData)
  }

  return {
    title: seo?.metaTitle || defaultTitle,
    description: seo?.metaDescription || defaultDesc,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: seo?.openGraph?.ogUrl || canonical,
      images: [
        {
          url: openGraphImage,
          width: metaImage?.width || 1200,
          height: metaImage?.height || 630,
          alt: metaImage?.alternativeText || ogTitle,
        },
      ],
      type: getValidOgType(seo?.openGraph?.ogType),
    },
    robots,
    alternates,
    ...(structuredData && {
      other: {
        structuredData,
      },
    }),
  }
}
