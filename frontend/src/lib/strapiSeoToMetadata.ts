import type { Metadata } from "next";

type StrapiImage = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

type StrapiSEO = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaRobots?: string;
  canonicalURL?: string;
  structuredData?: string | object;
  metaImage?: StrapiImage;
  openGraph?: {
    ogTitle?: string;
    ogDescription?: string;
    ogUrl?: string;
    ogType?: string;
    ogImage?: StrapiImage;
  };
};

type StrapiSeoToMetadataOpts = {
  seo?: StrapiSEO | null;
  siteUrl?: string;      // domain tuyệt đối, ví dụ: https://ontoolaz.com
  path?: string;         // path hiện tại, ví dụ: /ai/adcreative-ai
};

export function strapiSeoToMetadata({
                                      seo,
                                      siteUrl = "https://ontoolaz.com",
                                      path = "/"
                                    }: StrapiSeoToMetadataOpts): Metadata {
  // Giá trị mặc định SEO tốt
  const defaultTitle = "Ontoolaz - Discover the best AI tools";
  const defaultDesc = "Explore the latest and best AI tools for your business and creativity at Ontoolaz.";
  const defaultImage = `${siteUrl}/og-image.png`;
  const defaultKeywords = ["AI", "AI tools", "Ontoolaz"];
  const defaultRobots = { index: true, follow: true };
  const url = siteUrl + path;

  if (!seo) {
    return {
      title: defaultTitle,
      description: defaultDesc,
      keywords: defaultKeywords,
      openGraph: {
        title: defaultTitle,
        description: defaultDesc,
        url,
        images: [{ url: defaultImage, width: 1200, height: 630, alt: defaultTitle }],
      },
      robots: defaultRobots,
      alternates: { canonical: url },
    };
  }

  // Keywords: Strapi trả về string, SEO cần array
  let keywords: string[] = defaultKeywords;
  if (seo.keywords) {
    keywords = seo.keywords.split(",").map((kw) => kw.trim()).filter(Boolean);
  }

  // Robots
  let robots = defaultRobots;
  if (seo.metaRobots) {
    const robotStr = seo.metaRobots.toLowerCase();
    robots = {
      index: robotStr.includes("index"),
      follow: robotStr.includes("follow"),
    };
  }

  // Image
  const getImageUrl = (img?: StrapiImage) => {
    if (!img?.url) return defaultImage;
    return img.url.startsWith("http") ? img.url : siteUrl + img.url;
  };

  const metaImage = seo.metaImage || seo.openGraph?.ogImage;
  const openGraphImage = getImageUrl(metaImage);

  // Title/Description
  const ogTitle = seo.openGraph?.ogTitle || seo.metaTitle || defaultTitle;
  const ogDesc = seo.openGraph?.ogDescription || seo.metaDescription || defaultDesc;

  // Canonical
  const canonical = seo.canonicalURL || url;

  // Structured Data (nếu là object thì stringify, nếu là string giữ nguyên)
  let structuredData: string | undefined;
  if (seo.structuredData) {
    structuredData =
      typeof seo.structuredData === "string"
        ? seo.structuredData
        : JSON.stringify(seo.structuredData);
  }

  return {
    title: seo.metaTitle || defaultTitle,
    description: seo.metaDescription || defaultDesc,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: seo.openGraph?.ogUrl || canonical,
      images: [
        {
          url: openGraphImage,
          width: metaImage?.width || 1200,
          height: metaImage?.height || 630,
          alt: metaImage?.alternativeText || ogTitle,
        },
      ],
      type: seo.openGraph?.ogType || "website",
    },
    robots,
    alternates: {
      canonical,
    },
    ...(structuredData && {
      other: {
        // Dùng trường `other` để lưu structuredData, bạn render thủ công ở <head> trang
        structuredData,
      },
    }),
  };
}
