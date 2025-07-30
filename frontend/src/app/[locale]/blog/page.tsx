import { Metadata } from 'next'
import React from 'react'

import { seoMeta } from '@/lib/seoMeta'
import { singleTypeService } from '@/services/single-type.service'
import BlogPageClient from "@/components/blog/BlogPageClient";
import {blogService} from "@/services/blog.service";

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
  console.log('blogs', blogs)
  const page = resPage?.data || null

  return <BlogPageClient blogs={blogs} page={page} />
}
