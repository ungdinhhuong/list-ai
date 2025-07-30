import { CategoryType } from '@/types/category.type'
import { MediaType } from '@/types/media.type'
import type { StrapiSEO } from '@/types/seo.type'

export interface BlogType {
  id: number
  documentId: string
  title: string
  slug: string
  description: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  thumbnail?: MediaType | null
  blogCategory?: BlogCategoryType[]
  seo?: StrapiSEO | null
}

export interface BlogCategoryType {
  id: number
  documentId: string
  name: string
  icon: string
  slug: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface BlogPageType {
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

export interface BlogPageResponse {
  data: BlogPageType
  meta: Record<string, unknown>
}
