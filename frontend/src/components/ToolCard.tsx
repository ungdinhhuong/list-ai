import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

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
  variant?: "featured" | "compact"
}

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Featured":
      return "bg-orange-500 text-white"
    case "Popular":
      return "bg-green-500 text-white"
    case "New":
      return "bg-blue-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export default function ToolCard({ tool, variant = "compact" }: ToolCardProps) {
  if (variant === "featured") {
    return (
      <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors p-2">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0`}>
              {tool.name.charAt(0)}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-bold text-white mb-1 sm:mb-0">{tool.name}</h3>
                <Badge className={`${getBadgeColor(tool.badge ?? '')} text-xs px-2 py-1 self-center sm:self-auto`}>
                  {tool.badge}
                </Badge>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">{tool.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

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
              <Badge className={`${getBadgeColor(tool.badge ?? '')} text-xs px-1.5 py-0.5 flex-shrink-0`}>
                {tool.badge}
              </Badge>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{tool.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}