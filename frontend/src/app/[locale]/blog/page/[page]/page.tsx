import { Metadata } from 'next'
import React from 'react'

import BlogPageClient from '@/components/blog/BlogPageClient'
import { seoMeta } from '@/lib/seoMeta'
import { blogService } from '@/services/blog.service'
import { singleTypeService } from '@/services/single-type.service'
import { PAGE_SIZE } from '@/constants/constants'
import { notFound, redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

type Props = {
  params: { page: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageNumber = parseInt(params.page, 10)
  if (pageNumber === 1) redirect(ROUTES.BLOG)

  const pageData = await singleTypeService.getBlogPage()
  const seo = pageData?.data?.seo || null
  return seoMeta({ seo, path: `${ROUTES.BLOG}/page/${pageNumber}` })
}

export default async function BlogPaged({ params }: Props) {
  const page = parseInt(params.page, 10)
  if (isNaN(page) || page < 1) notFound()
  if (page === 1) redirect(ROUTES.BLOG)

  const [resBlogs, resPage] = await Promise.all([
    blogService.getBlogs({ page, pageSize: 9 }),
    singleTypeService.getBlogPage(),
  ])

  if (!resBlogs?.data?.length) notFound()
  return <BlogPageClient blogs={resBlogs} page={resPage?.data} />
}
