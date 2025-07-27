import { useTranslations } from 'next-intl'

import ToolCard from '@/components/ToolCard'
import { ToolType } from '@/types/tool.type'

interface AllToolsSectionProps {
  title?: string
  name?: string
  tools: ToolType[]
  lengthItems?: number
}

export default function AllToolsSection({
  title,
  name,
  tools,
  lengthItems = 4,
}: AllToolsSectionProps) {
  const isGridFour = lengthItems === 4
  const t = useTranslations()

  return (
    <section>
      <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-foreground">
        {title ? title : `All ${name || ''} Tools`}:
      </h2>

      {tools.length === 0 ? (
        <div className="text-muted-foreground text-lg">{t('category.noTools')}</div>
      ) : (
        <div
          className={`grid gap-4 lg:gap-4 ${
            isGridFour
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3'
          }`}
        >
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </section>
  )
}
