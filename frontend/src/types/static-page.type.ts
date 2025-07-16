import type {StrapiSEO} from "@/types/seo.type";

export interface StaticPageType {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  title: string;
  description: string;
  content: string;
  seo: StrapiSEO;
}

export interface StaticPageResponse {
  data: StaticPageType;
  meta: Record<string, unknown>;
}
