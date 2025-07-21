import { ToolType } from '@/types/tool.type'
import { PaginatedResponse } from '@/types/api.type'
import { apiGet } from '@/lib/apiRequest'

class ToolService {
  async getToolsByBadge(badge: string): Promise<PaginatedResponse<ToolType>> {
    return await apiGet(`/tools`, {
      params: {
        'filters[badge][$eq]': `${badge}`,
        'sort': 'updatedAt:desc',
        'populate': 'avatar',
      },
    })
  }

  async findBySlug(slug: string): Promise<ToolType | null> {
    const res = await apiGet(`/tools`, {
      params: {
        'filters[slug][$eq]': slug,
        'populate': ['avatar', 'categories', 'toolContent', 'seo'],
      },
    })
    return res.data?.[0]
  }

  async getToolsByCategory(categoryIds: string[]): Promise<PaginatedResponse<ToolType>> {
    return await apiGet('/tools', {
      params: {
        'filters[categories][id][$in]': categoryIds,
        'sort': 'updatedAt:desc',
        'populate': 'avatar',
        'pagination[page]': 1,
        'pagination[pageSize]': 9,
      },
    })
  }

  async getAllTools({ page, pageSize, q }: {
    page?: number;
    pageSize?: number;
    q?: string;
  }): Promise<PaginatedResponse<ToolType>> {
    const params: any = {
      sort: 'updatedAt:desc',
      populate: 'avatar',
      'pagination[page]': page || 1,
      'pagination[pageSize]': pageSize || 10,
    }

    if (q) {
      params['filters[name][$contains]'] = q
    }

    return await apiGet(`/tools`, { params })
  }
}

export const toolService = new ToolService()
