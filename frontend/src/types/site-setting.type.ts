import type { StrapiSEO } from '@/types/seo.type';

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

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface FooterLink {
  id: number;
  label: string;
  url: string;
}

export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  address: string;
}

export interface SiteSettingType {
  id: number;
  documentId: string;
  siteName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  logo: StrapiMedia;
  logoLight: StrapiMedia;
  defaultSeo: StrapiSEO;
  socialLinks: SocialLink[];
  footerLinks: FooterLink[];
  contactInfo: ContactInfo;
  scripts?: {
    headScripts: string;
    bodyScripts: string;
  }
  joinCommunity: string;
}

export interface SiteSettingResponse {
  data: SiteSettingType;
  meta: Record<string, unknown>;
}
