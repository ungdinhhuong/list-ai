import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import React from 'react'

import AIDetailClient from '@/components/ai/AIDetailClient'
import {seoMeta} from '@/lib/seoMeta'
import {toolService} from '@/services/tool.service'
import {ToolType} from '@/types/tool.type'

export async function generateMetadata({params}: AIDetailPageProps): Promise<Metadata> {
  const {slug} = await params
  const tool = await toolService.findBySlug(slug)
  if (!tool) {
    notFound()
  }

  const seo = tool?.seo || null
  return seoMeta({seo})
}

interface AIDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function AIDetailPage({params}: AIDetailPageProps) {
  const {slug} = await params
  const tool = await toolService.findBySlug(slug)
  if (!tool) {
    notFound()
  }

  const categoryIds = tool.categories?.map((category: any) => category.id) || []
  let relatedTools: ToolType[] = []
  if (categoryIds.length > 0) {
    const resToolsByCategory = await toolService.getToolsByCategory(categoryIds)
    relatedTools = resToolsByCategory.data || []
  }

  return <AIDetailClient tool={tool} relatedTools={relatedTools}/>
}
