'use client';

import React from "react";

import AllToolsSection from "@/components/section/AllToolsSection";
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";
import { CategoryType } from "@/types/category.type";

interface CategoryDetailClientProps {
  category: CategoryType;
}

export default function CategoryDetailClient({ category }: CategoryDetailClientProps) {
  return (
    <div className="container mx-auto lg:max-w-7xl space-y-18 text-foreground">
      {/* Tiêu đề danh mục */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 flex items-center justify-center text-3xl md:text-4xl font-bold">
          {category.icon}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
      </div>

      {/* Mô tả danh mục */}
      <p className="text-muted-foreground text-lg mb-16 max-w-2xl">
        {category.description}
      </p>

      {/* Danh sách tool */}
      <AllToolsSection tools={category.tools} name={category.name} />

      {/* Banner quảng cáo / đăng ký */}
      <NewsletterImage />
    </div>
  );
}
