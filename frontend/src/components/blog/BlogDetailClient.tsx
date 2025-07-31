'use client'
import {Calendar, Clock, User} from 'lucide-react'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import React from 'react'

import NewsletterImage from '@/components/section/newsletter/NewsletterImage'
import {Badge} from '@/components/ui/badge'
import {Separator} from '@/components/ui/separator'
import {BlogType} from "@/types/blog.type"
import {renderUrlImage} from "@/utils/functions";

interface BlogDetailClientProps {
  blog: BlogType
}

export default function BlogDetailClient({blog}: BlogDetailClientProps) {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8 lg:px-6 lg:py-12">
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
                    day: 'numeric'
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

          <Separator className="my-8"/>
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
            dangerouslySetInnerHTML={{__html: blog.content || ''}}
            className="prose-ckeditor"
          />
        </article>

        {/* Newsletter Section */}
        <div className="border-t border-border pt-8 lg:pt-12">
          <NewsletterImage/>
        </div>
      </div>
    </div>
  )
}
