import {MediaType} from "@/types/media.type";

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
}