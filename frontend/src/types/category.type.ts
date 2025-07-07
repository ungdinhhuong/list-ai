import {ToolType} from "@/types/tool.type";

export interface CategoryType {
  id: number;
  documentId: string;
  name: string;
  icon: string;
  slug: string;
  description: string;
  gradient: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  order: number;
  tools: ToolType[];
}
