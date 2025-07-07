import React from 'react';
import CategoryPageClient from "@/components/category/CategoryPageClient";
import {categoryService} from "@/services/category.service";

export default async function CategoryDetailPage() {
  const res = await categoryService.getCategories();
  const categories = res?.data || [];

  return <CategoryPageClient categories={categories}/>;
};
