'use client'

import { CalendarDays, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'

import Pagination from '@/components/common/Pagination'
import TitlePage from '@/components/common/TitlePage'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PaginatedResponse } from '@/types/api.type'
import { BlogPageType, BlogType } from '@/types/blog.type'
import { fromNow } from '@/utils/date'
import { renderUrlImage } from '@/utils/functions'

interface BlogPageClientProps {
  blogs: PaginatedResponse<BlogType>
  page?: BlogPageType
}

export default function BlogPageClient({ blogs, page }: BlogPageClientProps) {
  const t = useTranslations()
  return (
    <div className="container mx-auto lg:w-7xl space-y-8 relative">
      <TitlePage title={page?.title || ''} description={page?.description || ''} />

      {/* Blog Grid */}
      {blogs.data ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.data.map((post) => (
          <Card key={post.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden py-0 gap-4 shadow-none">
            {/* Image */}
            <div className="relative overflow-hidden border-b">
              <Image
                src={renderUrlImage(post.thumbnail?.url || '')}
                alt={post.title}
                width="370"
                height="250"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {post.category && (
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="transition-colors">
                    {post.category?.name}
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="gap-0">
              <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription className="line-clamp-3 transition-colors text-md">
                {post.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="pt-0 pb-4">
              <div className="flex items-center justify-between w-full text-sm">
                <div
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                  <User className="w-4 h-4" />
                  <span>{'Admin'}</span>
                </div>
                <div
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                  <CalendarDays className="w-4 h-4" />
                  <span>{fromNow(post.updatedAt)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>) : (<div>{t('common.noResults')}</div>)}


      {/* Load More Button */}
      {blogs.meta && blogs.meta.pagination.pageCount > 1 && (<Pagination meta={blogs.meta} />)}

    </div>
  )
};

