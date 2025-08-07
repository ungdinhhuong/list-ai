import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

import AIPageClient from '@/components/ai/AIPageClient';
import { StructuredData } from '@/components/common/StructuredData';
import { ROUTES } from '@/constants/routes';
import { seoMeta } from '@/lib/seoMeta';
import { singleTypeService } from '@/services/single-type.service';
import { toolService } from '@/services/tool.service';

type Props = {
  params: Promise<{ page: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsResolved = await params;
  const pageNumber = parseInt(paramsResolved.page, 10);
  if (pageNumber === 1) redirect(ROUTES.AI);

  const pageData = await singleTypeService.getAIPage();
  const seo = pageData?.data?.seo || null;

  return seoMeta({
    seo,
    path: `${ROUTES.AI}/page/${pageNumber}`,
    title: `${seo?.metaTitle || 'AI Tools'} - Page ${pageNumber}`,
  });
}

export default async function AIPagedPage({ params }: Props) {
  const paramsResolved = await params;
  const page = parseInt(paramsResolved.page, 10);
  if (isNaN(page) || page < 1) notFound();
  if (page === 1) redirect(ROUTES.AI);

  const [resData, resPage] = await Promise.all([
    toolService.getToolsByCategorySlug({ slug: 'ai-tools', page, pageSize: 15 }),
    singleTypeService.getAIPage(),
  ]);

  return (
    <>
      <AIPageClient tools={resData} page={resPage?.data} />
    </>
  );
}
