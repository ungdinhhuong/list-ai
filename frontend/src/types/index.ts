export interface AITool {
  id: string;
  name: string;
  description: string;
  image: string;
  badge?: 'Featured' | 'Popular' | 'New';
  category: string;
  color?: string;
}
