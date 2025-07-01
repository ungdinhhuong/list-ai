import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {getBadgeColor} from "@/lib/utils";
import BadgeCustom from "@/components/common/BadgeCustom";

interface AITool {
  id: string
  name: string
  description: string
  image: string
  badge?: "Featured" | "Popular" | "New"
  category: string
  color?: string
}

interface ToolCardProps {
  tool: AITool
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors p-2">
      <CardContent className="p-0">
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
            {tool.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-white text-sm truncate pr-2">{tool.name}</h3>
              <BadgeCustom badge={tool.badge} />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{tool.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}