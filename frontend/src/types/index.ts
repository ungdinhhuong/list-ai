export interface AITool {
  id: string
  name: string
  description: string
  image: string
  badge?: 'Featured' | 'Popular' | 'New'
  category: string
  color?: string
}

export interface SidebarCategory {
  name: string
  icon: string
  active?: boolean
}
