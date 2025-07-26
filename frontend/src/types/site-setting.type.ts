import type {StrapiSEO} from "@/types/seo.type";

// Strapi Media
export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    [key: string]: StrapiImageFormat | undefined;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Social Link
export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

// Footer Link
export interface FooterLink {
  id: number;
  label: string;
  url: string;
}

// Contact Info
export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  address: string;
}

// SiteSetting
export interface SiteSettingType {
  id: number;
  documentId: string;
  siteName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  logo: StrapiMedia;
  defaultSeo: StrapiSEO;
  socialLinks: SocialLink[];
  footerLinks: FooterLink[];
  contactInfo: ContactInfo;
}


export interface SiteSettingResponse {
  data: SiteSettingType;
  meta: Record<string, unknown>;
}
