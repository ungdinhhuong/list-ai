import {Metadata} from 'next'
import React from 'react'

import AIPageClient from '@/components/ai/AIPageClient'
import {ROUTES} from '@/constants/routes'
import {seoMeta} from '@/lib/seoMeta'
import {singleTypeService} from '@/services/single-type.service'
import {toolService} from '@/services/tool.service'

export async function generateMetadata(): Promise<Metadata> {
  const page = await singleTypeService.getAIPage()
  const seo = page?.data?.seo || null
  return seoMeta({seo, path: ROUTES.AI})
}

export default async function AIMainPage() {
  const [resData, resPage] = await Promise.all([
    toolService.getToolsByCategorySlug({slug: 'ai-tools', page: 1, pageSize: 20}),
    singleTypeService.getAIPage(),
  ])
  return <AIPageClient tools={resData} page={resPage?.data}/>
}
