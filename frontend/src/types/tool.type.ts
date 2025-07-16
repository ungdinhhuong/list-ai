import {MediaType} from "@/types/media.type";
import {CategoryType} from "@/types/category.type";
import type {StrapiSEO} from "@/types/seo.type";

export interface ToolType {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  link: string;
  badge: string | null;
  type: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  avatar?: MediaType | null;
  categories?: CategoryType[];
  toolContent?: ToolContent | null;
  seo?: StrapiSEO | null;
}

export interface ToolContent {
  id: number;
  documentId: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string; // ISO 8601 format
  updatedAt: string;
  publishedAt: string;
  locale: string;
}
