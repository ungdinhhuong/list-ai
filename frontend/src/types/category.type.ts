import {ToolType} from "@/types/tool.type";

export interface CategoryType {
  id: number;
  documentId: string;
  name: string;
  icon: string;
  slug: string;
  description: string;
  gradient: string;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  publishedAt: string; // ISO date string
  locale: string;
  order: number;
  tools: ToolType[];
}
