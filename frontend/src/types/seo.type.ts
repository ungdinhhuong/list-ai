// Kiểu dữ liệu cho hình ảnh từ Strapi
export type StrapiImage = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

// Kiểu dữ liệu SEO từ Strapi
export type StrapiSEO = {
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

export type StrapiSeoToMetadataOpts = {
  seo?: StrapiSEO | null;
  defaultSeo?: StrapiSEO | null;
  siteUrl?: string;
  path?: string;
};


// Các giá trị hợp lệ cho openGraph.type theo Next.js
export const validOgTypes = [
  "website",
  "article",
  "book",
  "profile",
  "music.song",
  "music.album",
  "music.playlist",
  "music.radio_station",
  "video.movie",
  "video.episode",
  "video.tv_show",
  "video.other",
] as const;

export type OgType = (typeof validOgTypes)[number];
