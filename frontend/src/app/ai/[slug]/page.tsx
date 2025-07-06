import React from 'react'
import AIDetailClient from "@/components/ai/AIDetailClient";
import {toolService} from "@/services/tool.service";
import {notFound} from "next/navigation";
import {ToolType} from "@/types/tool.type";

export default async function AIDetailPage({params}: { params: { slug: string } }) {
  const {slug} = await params;
  const tool = await toolService.findBySlug(slug);
  if (!tool) {
    notFound();
  }

  const categoryIds = tool.categories?.map((category: any) => category.id) || [];
  let relatedTools: ToolType[] = [];
  if (categoryIds.length > 0) {
    const resToolsByCategory = await toolService.getToolsByCategory(categoryIds);
    relatedTools = resToolsByCategory.data || [];
  }
  console.log(tool)

  return <AIDetailClient tool={tool} relatedTools={relatedTools}/>
}