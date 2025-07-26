import {useTranslations} from "next-intl";

import ToolCard from "@/components/ToolCard";
import {ToolType} from "@/types/tool.type";

interface FeaturedToolsSectionProps {
  tools: ToolType[]
}

export default function FeaturedToolsSection({ tools }: FeaturedToolsSectionProps) {
  const t = useTranslations();
  return (
    <section className="mb-8 lg:mb-12">
      <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-foreground">
        {t('homePage.featuredTools')} :
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
