import type { Metadata } from 'next';

import { OgType, StrapiImage, StrapiSeoToMetadataOpts, validOgTypes } from '@/types/seo.type';

type SeoMetaOptions = Omit<StrapiSeoToMetadataOpts, 'defaultSeo'> & {
  title?: string;
};

export function getValidOgType(type?: string): OgType {
  if (type && validOgTypes.includes(type as OgType)) {
    return type as OgType;
  }
  return 'website';
}

export function seoMeta({ seo, siteUrl, path = '/', title }: SeoMetaOptions): Metadata {
  const _siteUrl = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://ontoolaz.com';

  const defaultTitle = 'Ontoolaz - Discover the best AI tools';
  const defaultDesc = 'Explore the latest and best AI tools for your business and creativity at Ontoolaz.';
  const defaultImage = `${_siteUrl}/images/og-image.png`;
  const defaultKeywords = ['AI', 'AI tools', 'Ontoolaz'];
  const defaultRobots = { index: false, follow: false };

  const url = _siteUrl + path;

  let keywords: string[] = defaultKeywords;
  if (seo?.keywords) {
    keywords = seo.keywords
      .split(',')
      .map(kw => kw.trim())
      .filter(Boolean);
  }

  let robots = defaultRobots;
  if (seo?.metaRobots) {
    const robotStr = seo.metaRobots.toLowerCase();
    robots = {
      index: robotStr.includes('noindex'),
      follow: robotStr.includes('nofollow'),
    };
  }

  const getImageUrl = (img?: StrapiImage) => {
    if (!img?.url) return defaultImage;
    return img.url.startsWith('http') ? img.url : _siteUrl + img.url;
  };

  const metaImage = seo?.metaImage || seo?.openGraph?.ogImage;
  const openGraphImage = getImageUrl(metaImage);

  const fullTitle = title || seo?.metaTitle || defaultTitle;
  const ogTitle = title || seo?.openGraph?.ogTitle || seo?.metaTitle || defaultTitle;
  const ogDesc = seo?.openGraph?.ogDescription || seo?.metaDescription || defaultDesc;
  const canonical = seo?.canonicalURL || url;

  const alternates: Metadata['alternates'] = {
    canonical,
  };

  return {
    title: fullTitle,
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
  };
}
