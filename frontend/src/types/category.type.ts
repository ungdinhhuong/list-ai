import type { StrapiSEO } from '@/types/seo.type'
import { ToolType } from '@/types/tool.type'

export interface CategoryType {
  id: number
  documentId: string
  name: string
  icon: string
  slug: string
  description: string
  gradient: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  order: number
  tools: ToolType[]
  parent?: CategoryType
  categories?: CategoryType[]
}

export interface CategoryPageType {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  title: string
  description: string
  seo: StrapiSEO
}

export interface CategoryPageResponse {
  data: CategoryPageType
  meta: Record<string, unknown>
}

export type CategoryTree = {
  id: number
  name: string
  parent?: { id: number } | null
  categories?: CategoryTree[] // các category con (nếu populate)
}
