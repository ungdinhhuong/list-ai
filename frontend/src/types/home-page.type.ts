import { MediaFormat } from '@/types/media.type'
import { StrapiSEO } from '@/types/seo.type'

export interface HomePageType {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  title: string
  description: string
  seo: StrapiSEO,
  ads: Ads[]
}

export interface Ads {
  id: number
  title: string
  description: string
  link: string
  imageLink: string
  image?: MediaFormat
}
