'use client';

import React from "react";
import AllToolsSection from "@/components/section/AllToolsSection";
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";
import {CategoryType} from "@/types/category.type";

interface CategoryDetailClientProps {
  category: CategoryType;
}

export default function CategoryDetailClient({category}: CategoryDetailClientProps) {
  return (
    <div className="container mx-auto lg:max-w-7xl space-y-18">
      <div className="flex items-center gap-4 mb-6">
        {/*<div*/}
        {/*  className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center text-white font-bold text-2xl`}>*/}
        {/*  {category.icon}*/}
        {/*</div>*/}
        <div
          className={`w-12 h-12 flex items-center justify-center text-3xl md:text-4xl font-bold`}>
          {category.icon}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{category?.name}</h1>
      </div>

      <p className="text-gray-400 text-lg mb-16 max-w-2xl">{category?.description}</p>

      {/* Danh sách tool AI */}
      <AllToolsSection tools={category.tools} name={category.name}/>

      <NewsletterImage/>
    </div>
  )
}