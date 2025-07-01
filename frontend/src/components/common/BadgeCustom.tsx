import {Badge} from "@/components/ui/badge";
import {getBadgeColor, getBadgeOutlineColor} from "@/lib/utils";

export interface BadgeCustomProps {
  badge?: string;
  title?: string;
  type?: 'default' | 'outline';
}

export default function BadgeCustom({badge, title, type = 'default'}: BadgeCustomProps) {
  return (
    type === 'default' ? (
        <Badge className={`${getBadgeColor(badge ?? '')} text-xs px-1.5 py-0.5 flex-shrink-0 cursor-pointer transition-colors`}>
          {title || badge}
        </Badge>
      ) :
      (
        <Badge className={`${getBadgeOutlineColor(badge ?? '')} text-xs px-1.5 py-0.5 flex-shrink-0 cursor-pointer transition-colors`} variant="outline">
          {title || badge}
        </Badge>
      )
  )
};