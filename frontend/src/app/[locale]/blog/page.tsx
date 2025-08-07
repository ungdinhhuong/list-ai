import { Metadata } from 'next';
import React from 'react';

import BlogPageClient from '@/components/blog/BlogPageClient';
import { StructuredData } from '@/components/common/StructuredData';
import { ROUTES } from '@/constants/routes';
import { seoMeta } from '@/lib/seoMeta';
import { blogService } from '@/services/blog.service';
import { singleTypeService } from '@/services/single-type.service';

export async function generateMetadata(): Promise<Metadata> {
  const page = await singleTypeService.getBlogPage();
  const seo = page?.data?.seo || null;
  return seoMeta({ seo, path: ROUTES.BLOG, title: seo?.metaTitle || 'Blogs' });
}

export default async function BlogMainPage() {
  const [resBlogs, resPage] = await Promise.all([
    blogService.getBlogs({ page: 1, pageSize: 9 }),
    singleTypeService.getBlogPage(),
  ]);
  return (
    <>
      <BlogPageClient blogs={resBlogs} page={resPage?.data} />
      <StructuredData jsonLd={resPage?.data?.seo?.structuredData} />
    </>
  );
}
