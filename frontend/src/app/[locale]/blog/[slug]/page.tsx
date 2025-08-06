import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import BlogDetailClient from '@/components/blog/BlogDetailClient'
import { StructuredData } from "@/components/common/StructuredData";
import { seoMeta } from '@/lib/seoMeta'
import { blogService } from '@/services/blog.service'

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await blogService.findBySlug(slug)
  if (!blog) {
    notFound()
  }

  const seo = blog?.seo || null
  return seoMeta({ seo })
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await blogService.findBySlug(slug)
  if (!blog) {
    notFound()
  }

  return (
    <>
      <BlogDetailClient blog={blog}/>
      <StructuredData jsonLd={blog?.seo?.structuredData}/>
    </>
  )
}
