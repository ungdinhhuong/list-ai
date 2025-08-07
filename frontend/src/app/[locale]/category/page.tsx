import { Metadata } from 'next';
import React from 'react';

import CategoryPageClient from '@/components/category/CategoryPageClient';
import { StructuredData } from '@/components/common/StructuredData';
import { seoMeta } from '@/lib/seoMeta';
import { categoryService } from '@/services/category.service';
import { singleTypeService } from '@/services/single-type.service';

export async function generateMetadata(): Promise<Metadata> {
  const page = await singleTypeService.getCategoryPage();
  const seo = page?.data?.seo || null;
  return seoMeta({ seo });
}

export default async function CategoryDetailPage() {
  const [categories, resPage] = await Promise.all([
    categoryService.getCategoryTree(),
    singleTypeService.getCategoryPage(),
  ]);
  const page = resPage?.data || null;

  return (
    <>
      <CategoryPageClient categories={categories} page={page} />
      <StructuredData jsonLd={page?.seo?.structuredData} />
    </>
  );
}
