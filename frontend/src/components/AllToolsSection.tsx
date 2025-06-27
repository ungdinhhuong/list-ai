import ToolCard from "./ToolCard"

interface AITool {
  id: string
  name: string
  description: string
  image: string
  badge?: "Featured" | "Popular" | "New"
  category: string
  color?: string
}

interface AllToolsSectionProps {
  tools: AITool[]
}

export default function AllToolsSection({ tools }: AllToolsSectionProps) {
  return (
    <section className="px-4">
      <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">All Tools:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} variant="compact"/>
        ))}
      </div>
    </section>
  )
}