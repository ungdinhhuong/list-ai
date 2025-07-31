import { Metadata } from 'next'
import React from 'react'

import BlogPageClient from "@/components/blog/BlogPageClient";
import { seoMeta } from '@/lib/seoMeta'
import {blogService} from "@/services/blog.service";
import { singleTypeService } from '@/services/single-type.service'

export async function generateMetadata(): Promise<Metadata> {
  const page = await singleTypeService.getBlogPage()
  const seo = page?.data?.seo || null
  return seoMeta({ seo })
}

export default async function BlogPage() {
  const [resBlogs, resPage] = await Promise.all([
    blogService.getBlogs(),
    singleTypeService.getBlogPage(),
  ])
  const blogs = resBlogs?.data || []
  const page = resPage?.data || null

  return <BlogPageClient blogs={blogs} page={page} />
}
