import { CategoryType } from '@/types/category.type';
import { MediaType } from '@/types/media.type';
import type { StrapiSEO } from '@/types/seo.type';

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
  content: string;
  seo?: StrapiSEO | null;
}
