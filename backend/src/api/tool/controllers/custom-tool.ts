import { factories } from '@strapi/strapi';
import { Context } from 'koa';

export default factories.createCoreController('api::tool.tool', ({ strapi }) => ({
  async byCategorySlug(ctx: Context) {
    const { slug } = ctx.params;
    const { q, categoryId, page = '1', pageSize = '20' } = ctx.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);
    const start = (pageNumber - 1) * pageSizeNumber;

    // 1. Lấy category cha theo slug
    const [parent] = await strapi.entityService.findMany('api::category.category', {
      filters: { slug },
      fields: ['id'],
    });

    if (!parent) return ctx.notFound('Category not found');

    const parentId = parent.id;

    // 2. Đệ quy lấy tất cả category con các cấp
    const childIds = await getAllChildCategoryIds(Number(parentId));
    const allCategoryIds = [parentId, ...childIds];

    // 3. Nếu có categoryId cụ thể thì lọc theo nó
    const filterIds = categoryId
      ? [parseInt(categoryId as string, 10)]
      : allCategoryIds;

    // 4. Tạo filter
    const filters: any = {
      categories: {
        id: {
          $in: filterIds,
        },
      },
    };

    if (q) {
      filters.name = { $containsi: q };
    }

    // 5. Query tools + count
    const [data, total] = await strapi.db
      .query('api::tool.tool')
      .findWithCount({
        where: filters,
        populate: ['categories', 'avatar'],
        orderBy: { createdAt: 'desc' },
        offset: start,
        limit: pageSizeNumber,
      });

    const pageCount = Math.ceil(total / pageSizeNumber);

    ctx.body = {
      data,
      meta: {
        pagination: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          pageCount,
          total,
        },
      },
    };
  },
}));

async function getAllChildCategoryIds(parentId: number): Promise<number[]> {
  const children = await strapi.entityService.findMany('api::category.category', {
    filters: { parent: { id: parentId } },
    fields: ['id'],
    limit: 1000,
  });

  const directIds = children.map(c => Number(c.id)); // Ép về number
  const nestedIds = await Promise.all(directIds.map(id => getAllChildCategoryIds(Number(id))));

  const allNestedIds = nestedIds.flat().map(Number); // Ép về number sau khi flatten

  return [...directIds, ...allNestedIds];
}
