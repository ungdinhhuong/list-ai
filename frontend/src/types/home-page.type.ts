import type { StrapiSEO } from '@/types/seo.type'

export interface HomePageType {
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

export interface HomePageResponse {
  data: HomePageType
  meta: Record<string, unknown>
}
