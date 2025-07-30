import { apiGet } from '@/lib/apiRequest'
import { PaginatedResponse } from '@/types/api.type'
import { CategoryType } from '@/types/category.type'
import {BlogType} from "@/types/blog.type";

class BlogService {
  async getBlogs(): Promise<PaginatedResponse<BlogType>> {
    return await apiGet('/blogs', {
      params: {
        sort: 'id:asc',
        populate: {
          thumbnail: true,
          blogCategory: true,
          seo: {
            populate: {
              openGraph: {
                populate: ['ogImage'],
              },
              metaImage: true,
            },
          },
        },
      },
    })
  }

  async findBySlug(slug: string): Promise<BlogType | null> {
    const res = await apiGet(`/categories`, {
      params: {
        'filters[slug][$eq]': slug,
        populate: 'tools.avatar',
      },
    })
    return res.data?.[0]
  }
}

export const blogService = new BlogService()
