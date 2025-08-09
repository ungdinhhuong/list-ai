import { apiGet } from '@/lib/apiRequest';
import { PaginatedResponse } from '@/types/api.type';
import { BlogType } from '@/types/blog.type';

interface GetBlogsParams {
  page?: number;
  pageSize?: number;
}

interface GetBlogsRelatedParams {
  categoryId: number;
  excludeId: number;
  limit: number;
}

const BLOG_FIELDS = [
  'id',
  'documentId',
  'title',
  'slug',
  'description',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'locale',
];

class BlogService {
  async getBlogs({ page, pageSize }: GetBlogsParams): Promise<PaginatedResponse<BlogType>> {
    return await apiGet('/blogs', {
      params: {
        sort: 'id:asc',
        'fields[]': BLOG_FIELDS,
        populate: {
          thumbnail: true,
          category: true,
          seo: {
            populate: {
              openGraph: {
                populate: ['ogImage'],
              },
              metaImage: true,
            },
          },
        },
        'pagination[page]': page || 1,
        'pagination[pageSize]': pageSize || 10,
      },
    });
  }

  async findBySlug(slug: string): Promise<BlogType | null> {
    const res = await apiGet(`/blogs`, {
      params: {
        'filters[slug][$eq]': slug,
        populate: {
          thumbnail: true,
          category: true,
          seo: true,
          // localizations: {
          //   fields: ['id', 'title', 'slug'],
          // }
        },
      },
    });
    return res.data?.[0];
  }

  async getBlogsRelated({ categoryId, excludeId, limit }: GetBlogsRelatedParams): Promise<PaginatedResponse<BlogType>> {
    return await apiGet('/blogs', {
      params: {
        sort: 'updatedAt:desc',
        'fields[]': BLOG_FIELDS,
        populate: {
          thumbnail: true,
          category: true,
        },
        'filters[category][id][$eq]': categoryId,
        'filters[id][$ne]': excludeId,
        'pagination[pageSize]': limit,
      },
    });
  }
}

export const blogService = new BlogService();
