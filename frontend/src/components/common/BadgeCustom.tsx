import { Badge } from '@/components/ui/badge'
import { getBadgeColor, getBadgeOutlineColor } from '@/lib/utils'

export interface BadgeCustomProps {
  badge: string
  title?: string
  type?: 'default' | 'outline'
}

export default function BadgeCustom({ badge, title, type = 'default' }: BadgeCustomProps) {
  const badgeText = title || badge

  if (!badgeText) return null

  const baseClass = 'text-xs px-1.5 py-0.5 flex-shrink-0 cursor-pointer transition-colors'
  const badgeColor = badge.charAt(0).toUpperCase() + badge.slice(1).toLowerCase()
  return type === 'default' ? (
    <Badge className={`${getBadgeColor(badgeColor)} ${baseClass}`}>{badgeText}</Badge>
  ) : (
    <Badge variant="outline" className={`${getBadgeOutlineColor(badgeColor)} ${baseClass}`}>
      {badgeText}
    </Badge>
  )
}
