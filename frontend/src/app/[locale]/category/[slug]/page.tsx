import { notFound } from 'next/navigation';
import React from 'react';

import CategoryDetailClient from '@/components/category/CategoryDetailClient';
import { categoryService } from '@/services/category.service';

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await categoryService.findBySlug(slug);
  if (!category) {
    notFound();
  }

  return (
    <>
      <CategoryDetailClient category={category} />
      {/*<StructuredData jsonLd={category?.seo?.structuredData}/>*/}
    </>
  );
}
