import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import { StructuredData } from '@/components/common/StructuredData';
import NewsletterImage from '@/components/section/newsletter/NewsletterImage';
import { seoMeta } from '@/lib/seoMeta';
import { singleTypeService } from '@/services/single-type.service';

export async function generateMetadata(): Promise<Metadata> {
  const page = await singleTypeService.getAboutPage();
  const seo = page?.seo || null;
  return seoMeta({ seo });
}

export default async function AboutPage() {
  const page = await singleTypeService.getAboutPage();
  if (!page) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto lg:max-w-4xl space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} className="prose-ckeditor" />
        <NewsletterImage />
      </div>
      <StructuredData jsonLd={page?.seo?.structuredData} />
    </>
  );
}
