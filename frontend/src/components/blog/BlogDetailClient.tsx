'use client'
import { Calendar, User } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

import BlogGrid from '@/components/blog/BlogGrid'
import ShareButtons from '@/components/blog/ShareButtons'
import NewsletterImage from '@/components/section/newsletter/NewsletterImage'
import { Badge } from '@/components/ui/badge'
import { BlogType } from '@/types/blog.type'
import { renderUrlImage } from '@/utils/functions'

interface BlogDetailClientProps {
  blog: BlogType
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const t = useTranslations()
  const [relatedBlogs, setRelatedBlogs] = useState<BlogType[]>([])
  const [loadingRelated, setLoadingRelated] = useState(false)

  useEffect(() => {
    if (!blog.category?.id || !blog.id) return

    const fetchRelatedBlogs = async () => {
      try {
        setLoadingRelated(true)
        const url = `/api/blogs/related?categoryId=${blog?.category?.id}&excludeId=${blog.id}&limit=4`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const json = await response.json()
        setRelatedBlogs(json?.data || [])
      } catch (err) {
        console.error('Failed to fetch related blogs:', err)
      } finally {
        setLoadingRelated(false)
      }
    }

    fetchRelatedBlogs()
  }, [blog.category?.id, blog.id])

  return (
    <div className="container mx-auto lg:w-4xl space-y-8 relative">
      {/* Header Section */}
      <div className="space-y-6 lg:space-y-8">
        {/* Categories/Tags */}
        {blog.category && (
          <Badge
            variant="secondary"
            className="text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {blog.category.name}
          </Badge>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl leading-tight">
          {blog.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl">
          {blog.description}
        </p>

        <div className="flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4"/>
              <span>Admin</span>
            </div>
            {blog.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4"/>
                <time dateTime={blog.publishedAt}>
                  {new Date(blog.publishedAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            )}
            {/*{blog.readTime && (*/}
            {/*  <div className="flex items-center gap-2">*/}
            {/*    <Clock className="h-4 w-4"/>*/}
            {/*    <span>{blog.readTime} phút đọc</span>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
          <ShareButtons/>
        </div>

      </div>

      {/* Thumbnail Image */}
      {blog.thumbnail && (
        <div className="relative mb-8 lg:mb-12">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={renderUrlImage(blog.thumbnail.url || '')}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="mb-12 lg:mb-16">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          className="prose-ckeditor"
        />
      </article>

      {/* Related Articles Section */}
      {!loadingRelated && relatedBlogs.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {t('blog.relatedArticles')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedBlogs.map((item) => <BlogGrid post={item} key={item.id}/>)}
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="pt-8 lg:pt-12">
        <NewsletterImage/>
      </div>
    </div>
  )
}
