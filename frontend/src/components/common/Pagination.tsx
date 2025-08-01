'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PaginationMeta } from '@/types/api.type'

type Props = {
  meta: PaginationMeta
}

export default function Pagination({ meta }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const { page, pageCount } = meta.pagination

  if (pageCount <= 1) return null

  const basePath = pathname.replace(/\/page\/\d+$/, '')

  const generatePageUrl = (pageNum: number) => {
    return pageNum === 1 ? basePath : `${basePath}/page/${pageNum}`
  }

  const renderPages = () => {
    const visible: (number | 'dots')[] = []

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) visible.push(i)
    } else {
      visible.push(1)

      if (page > 4) visible.push('dots')

      const start = Math.max(2, page - 1)
      const end = Math.min(pageCount - 1, page + 1)

      for (let i = start; i <= end; i++) visible.push(i)

      if (page < pageCount - 3) visible.push('dots')

      visible.push(pageCount)
    }

    return visible.map((p, idx) =>
      p === 'dots' ? (
        <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground">...</span>
      ) : (
        <Button
          key={p}
          variant={p === page ? 'default' : 'outline'}
          size="icon"
          className={cn('w-9 h-9 rounded-md text-sm', p === page ? 'font-bold' : '')}
          onClick={() => router.push(generatePageUrl(p))}
        >
          {p}
        </Button>
      )
    )
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        variant="ghost"
        size="icon"
        disabled={page === 1}
        onClick={() => router.push(generatePageUrl(page - 1))}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {renderPages()}

      <Button
        variant="ghost"
        size="icon"
        disabled={page === pageCount}
        onClick={() => router.push(generatePageUrl(page + 1))}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
