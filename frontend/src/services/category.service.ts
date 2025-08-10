import { apiGet } from '@/lib/apiRequest';
import { PaginatedResponse } from '@/types/api.type';
import { CategoryType } from '@/types/category.type';

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

class CategoryService {
  async getCategories(): Promise<PaginatedResponse<CategoryType>> {
    return await apiGet('/categories', {
      params: {
        sort: 'order:asc',
        populate: {
          tools: {
            fields: TOOL_FIELDS,
            populate: {
              avatar: true,
            },
          },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<CategoryType | null> {
    const res = await apiGet(`/categories`, {
      params: {
        'filters[slug][$eq]': slug,
        populate: {
          tools: {
            populate: ['avatar'],
          },
          // localizations: {
          //   fields: ['id', 'name', 'slug'],
          // }
        },
      },
    });
    return res.data?.[0];
  }

  async getCategoryTree(): Promise<CategoryType[]> {
    const map = new Map<number, CategoryType & { children: CategoryType[] }>();
    const response = await apiGet('/categories', {
      params: {
        sort: 'order:asc',
        filters: {
          isShow: true,
        },
        populate: {
          parent: true,
          tools: {
            fields: TOOL_FIELDS,
            populate: ['avatar'],
          },
        },
      },
    });

    response.data.forEach((cat: CategoryType & { children: CategoryType[] }) => {
      map.set(cat.id, { ...cat, children: [] });
    });

    const roots: CategoryType[] = [];

    map.forEach(cat => {
      if (cat.parent && cat.parent.id) {
        const parent = map.get(cat.parent.id);
        if (parent) {
          parent.children.push(cat);
        }
      } else {
        roots.push(cat);
      }
    });

    return roots;
  }
}

export const categoryService = new CategoryService();
