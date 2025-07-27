import { apiGet } from '@/lib/apiRequest'
import { PaginatedResponse } from '@/types/api.type'
import { CategoryType } from '@/types/category.type'

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
}

export const categoryService = new CategoryService()
