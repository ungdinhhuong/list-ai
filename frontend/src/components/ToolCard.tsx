import { Card, CardContent } from "@/components/ui/card";
import BadgeCustom from "@/components/common/BadgeCustom";
import AvatarLogo from "@/components/common/AvatarLogo";
import Link from "next/link";
import { toSlug } from "@/lib/utils";
import { ToolType } from "@/types/tool.type";
import {ROUTES} from "@/constants/routes";

interface ToolCardProps {
  tool: ToolType;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={ROUTES.AI_DETAIL(toSlug(tool.name))} className="block">
      <Card className="bg-background border-border hover:border-accent transition-colors p-2">
        <CardContent className="p-0">
          <div className="flex items-start space-x-3">
            <AvatarLogo text={tool.name} img={tool?.avatar?.url || ""} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-sm text-foreground truncate pr-2 line-clamp-1">
                  {tool.name}
                </h3>
                <BadgeCustom badge={tool.badge} />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}