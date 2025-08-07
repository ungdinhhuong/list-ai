import { apiGet } from '@/lib/apiRequest';
import { PaginatedResponse } from '@/types/api.type';
import { ToolType } from '@/types/tool.type';

const TOOL_FIELDS = [
  'id',
  'documentId',
  'name',
  'slug',
  'description',
  'link',
  'badge',
  'type',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'locale',
];

class ToolService {
  async getToolsByBadge(badge: string): Promise<PaginatedResponse<ToolType>> {
    return await apiGet(`/tools`, {
      params: {
        'filters[badge][$eq]': `${badge}`,
        sort: 'updatedAt:desc',
        populate: 'avatar',
        'fields[]': TOOL_FIELDS,
      },
    });
  }

  async findBySlug(slug: string): Promise<ToolType | null> {
    const res = await apiGet(`/tools`, {
      params: {
        'filters[slug][$eq]': slug,
        populate: ['avatar', 'categories', 'seo'],
      },
    });
    return res.data?.[0];
  }

  async getToolsByCategory(categoryIds: string[], currentToolId?: number): Promise<PaginatedResponse<ToolType>> {
    const params: Record<string, any> = {
      'filters[categories][id][$in]': categoryIds,
      sort: 'updatedAt:desc',
      populate: 'avatar',
      'pagination[page]': 1,
      'pagination[pageSize]': 9,
      'fields[]': TOOL_FIELDS,
    };

    if (currentToolId) {
      params['filters[id][$ne]'] = currentToolId;
    }

    return await apiGet('/tools', { params });
  }

  async getAllTools({
    page,
    pageSize,
    q,
  }: {
    page?: number;
    pageSize?: number;
    q?: string;
  }): Promise<PaginatedResponse<ToolType>> {
    const params: any = {
      sort: 'updatedAt:desc',
      populate: 'avatar',
      'pagination[page]': page || 1,
      'pagination[pageSize]': pageSize || 10,
      'fields[]': TOOL_FIELDS,
    };

    if (q) {
      params['filters[name][$contains]'] = q;
    }

    return await apiGet(`/tools`, { params });
  }

  async getToolsByCategorySlug({
    slug,
    page,
    pageSize,
    q,
    categoryId,
  }: {
    slug: string;
    page?: number;
    pageSize?: number;
    q?: string;
    categoryId?: number;
  }): Promise<PaginatedResponse<ToolType>> {
    const params: Record<string, any> = {
      page: page || 1,
      pageSize: pageSize || 10,
      'fields[]': TOOL_FIELDS,
    };

    if (q) {
      params.q = q;
    }

    if (categoryId) {
      params.categoryId = categoryId;
    }

    return await apiGet(`/tools/by-category/${slug}`, { params });
  }
}

export const toolService = new ToolService();
