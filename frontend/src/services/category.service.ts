import {PaginatedResponse} from "@/types/api.type";
import {CategoryRes} from "@/types/category.type";
import axiosClient from "@/services/axiosClient";

class CategoryService {
  async getCategories(): Promise<PaginatedResponse<CategoryRes>> {
    return await axiosClient.get('/categories');
  }
}

export const categoryService = new CategoryService();