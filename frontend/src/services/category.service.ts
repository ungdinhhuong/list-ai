import { apiGet } from '@/lib/apiRequest'
import { PaginatedResponse } from '@/types/api.type'
import { CategoryTree, CategoryType } from '@/types/category.type'

class CategoryService {
  async getCategories(): Promise<PaginatedResponse<CategoryType>> {
    return await apiGet('/categories', {
      params: {
        sort: 'order:asc',
      },
    })
  }

  async findBySlug(slug: string): Promise<CategoryType | null> {
    const res = await apiGet(`/categories`, {
      params: {
        'filters[slug][$eq]': slug,
        populate: 'tools.avatar',
      },
    })
    return res.data?.[0]
  }

  async getCategoryTree(): Promise<CategoryType[]> {
    const map = new Map<number, CategoryType & { children: CategoryType[] }>()
    const response = await apiGet('/categories', {
      params: {
        sort: 'order:asc',
        populate: 'parent',
      },
    })
    // B1: init all node with children array
    response.data.forEach(cat => {
      map.set(cat.id, { ...cat, children: [] })
    })

    const roots: CategoryType[] = []

    // B2: gắn con vào cha
    map.forEach(cat => {
      if (cat.parent && cat.parent.id) {
        const parent = map.get(cat.parent.id)
        if (parent) {
          parent.children.push(cat)
        }
      } else {
        roots.push(cat)
      }
    })

    return roots
  }
}

export const categoryService = new CategoryService()
