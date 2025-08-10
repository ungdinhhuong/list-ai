import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import AIDetailClient from '@/components/ai/AIDetailClient';
import { StructuredData } from '@/components/common/StructuredData';
import { seoMeta } from '@/lib/seoMeta';
import { toolService } from '@/services/tool.service';
import { ToolType } from '@/types/tool.type';

export async function generateMetadata({ params }: AIDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tools = await toolService.findBySlug(slug);
  if (!tools) {
    notFound();
  }

  const tool: ToolType = tools[0] || null;
  const seo = tool?.seo || null;
  return seoMeta({ seo });
}

interface AIDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AIDetailPage({ params }: AIDetailPageProps) {
  const { slug } = await params;
  const tools = await toolService.findBySlug(slug);
  if (!tools) {
    notFound();
  }
  const tool: ToolType = tools[0] || null;

  const categoryIds = tool.categories?.map((category: any) => category.id) || [];
  let relatedTools: ToolType[] = [];
  if (categoryIds.length > 0) {
    const resToolsByCategory = await toolService.getToolsByCategory(categoryIds, tool.id);
    relatedTools = resToolsByCategory.data || [];
  }

  return (
    <>
      <AIDetailClient tool={tool} relatedTools={relatedTools} />
      <StructuredData jsonLd={tool?.seo?.structuredData} />
    </>
  );
}
