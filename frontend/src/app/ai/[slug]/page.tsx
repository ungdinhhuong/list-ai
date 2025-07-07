import React from 'react'
import AIDetailClient from "@/components/ai/AIDetailClient";
import {toolService} from "@/services/tool.service";
import {notFound} from "next/navigation";
import {ToolType} from "@/types/tool.type";
import { Metadata } from "next";
import {APP_URL, STRAPI_URL} from "@/constants/env";

export async function generateMetadata({ params }: AIDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await toolService.findBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | Ontoolaz",
      description: "This tool does not exist on Ontoolaz.",
    };
  }

  return {
    title: `${tool.name} - Ontoolaz`,
    description: tool.tool_content?.metaDescription || tool.description || "Chi tiết về công cụ AI.",
    keywords: [
      tool.name,
      ...(tool.categories?.map((cat: any) => cat.name) || []),
      "AI tools",
      "Ontoolaz"
    ],
    openGraph: {
      title: `${tool.name} - Ontoolaz`,
      description: tool.tool_content?.metaDescription || tool.description || "Chi tiết về công cụ AI.",
      url: `${APP_URL}/ai/${slug}`,
      images: [
        {
          url: tool.avatar?.url
            ? `${STRAPI_URL}` + tool.avatar.url
            : "${APP_URL}/og-image.png",
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
  };
}

interface AIDetailPageProps {
  params: { slug: string }
}

export default async function AIDetailPage({params}: AIDetailPageProps) {
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

  return <AIDetailClient tool={tool} relatedTools={relatedTools}/>
}