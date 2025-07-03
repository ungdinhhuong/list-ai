import {Card, CardContent} from "@/components/ui/card"
import BadgeCustom from "@/components/common/BadgeCustom";
import AvatarLogo from "@/components/common/AvatarLogo";
import Link from "next/link";
import {toSlug} from "@/lib/utils";

interface AITool {
  id: string
  name: string
  description: string
  image: string
  badge?: "Featured" | "Popular" | "New"
  category: string
  color?: string
  slug: string
}

interface ToolCardProps {
  tool: AITool
}

export default function ToolCard({tool}: ToolCardProps) {
  return (
    <Link href={`/ai/${toSlug(tool.name)}`} className="block">
      <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors p-2">
        <CardContent className="p-0">
          <div className="flex items-start space-x-3">
            <AvatarLogo text={tool.name} img={''}/>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-white text-sm truncate pr-2 line-clamp-1">{tool.name}</h3>
                <BadgeCustom badge={tool.badge}/>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{tool.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}