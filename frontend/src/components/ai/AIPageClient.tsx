'use client'

import React from 'react'

import Pagination from '@/components/common/Pagination'
import TitlePage from '@/components/common/TitlePage'
import { PaginatedResponse } from '@/types/api.type'
import { AIPageType } from '@/types/ai.type'
import ToolCard from '@/components/ToolCard'
import { ToolType } from '@/types/tool.type'
import { useTranslations } from 'next-intl'

interface AIPageClientProps {
  tools: PaginatedResponse<ToolType>
  page?: AIPageType
}

export default function AIPageClient({ tools, page }: AIPageClientProps) {
  const t = useTranslations()

  return (
    <div className="container mx-auto lg:w-7xl space-y-8 relative">
      <TitlePage title={page?.title || ''} description={page?.description || ''} />

      {tools.data.length === 0 ? (
        <div className="text-muted-foreground text-lg">{t('category.noTools')}</div>
      ) : (
        <div className="grid gap-4 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {tools.data.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {tools.meta && tools.meta.pagination.pageCount > 1 && (<Pagination meta={tools.meta} />)}
    </div>
  )
};

