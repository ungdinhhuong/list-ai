import type { StrapiSEO } from '@/types/seo.type'

export interface AIPageType {
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
