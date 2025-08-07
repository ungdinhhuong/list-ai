'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import BlogGrid from '@/components/blog/BlogGrid';
import Pagination from '@/components/common/Pagination';
import TitlePage from '@/components/common/TitlePage';
import { PaginatedResponse } from '@/types/api.type';
import { BlogPageType, BlogType } from '@/types/blog.type';

interface BlogPageClientProps {
  blogs: PaginatedResponse<BlogType>;
  page?: BlogPageType;
}

export default function BlogPageClient({ blogs, page }: BlogPageClientProps) {
  const t = useTranslations();
  return (
    <div className="container mx-auto lg:w-7xl space-y-8 relative">
      <TitlePage title={page?.title || ''} description={page?.description || ''} />

      {/* Blog Grid */}
      {blogs.data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.data.map(post => (
            <BlogGrid post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div>{t('common.noResults')}</div>
      )}

      {blogs.meta && blogs.meta.pagination.pageCount > 1 && <Pagination meta={blogs.meta} />}
    </div>
  );
}
