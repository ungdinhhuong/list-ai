import ToolCard from "@/components/ToolCard";
import {ToolType} from "@/types/tool.type";

interface AllToolsSectionProps {
  name?: string,
  tools: ToolType[],
  lengthItems?: number
}

export default function AllToolsSection({name, tools, lengthItems = 4}: AllToolsSectionProps) {
  return (
    <section>
      <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">All {name || ''} Tools:</h2>
      {
        tools.length === 0 && (
          <div className="text-gray-400 text-lg">
            No tools found in this category.
          </div>
        )
      }
      {
        lengthItems === 4
          ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool}/>
              ))}
            </div>
          )
          : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool}/>
              ))}
            </div>
          )
      }
    </section>
  )
}