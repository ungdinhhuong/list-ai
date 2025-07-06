import {ToolType} from "@/types/tool.type";
import {PaginatedResponse} from "@/types/api.type";
import axiosClient from "@/services/axiosClient";

class ToolService {
  async getToolsByBadge(badge: string): Promise<PaginatedResponse<ToolType>> {
    return await axiosClient.get(`/tools`, {
      params: {
        'filters[badge][$eq]': `${badge}`,
        'sort': 'updatedAt:desc',
        'populate': 'avatar',
      }
    });
  }

  async getAllTools({ page, pageSize}): Promise<PaginatedResponse<ToolType>> {
    return await axiosClient.get(`/tools`, {
      params: {
        'sort': 'updatedAt:desc',
        'populate': 'avatar',
        'pagination[page]': page || 1,
        'pagination[pageSize]': pageSize || 10,
      }
    });
  }
}

export const toolService = new ToolService();