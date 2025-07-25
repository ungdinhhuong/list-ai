'use client';
import React from 'react';
import {Card, CardContent} from '@/components/ui/card';
import NewsletterImage from '@/components/section/newsletter/NewsletterImage';
import {CategoryPageType, CategoryType} from "@/types/category.type";
import {ROUTES} from "@/constants/routes";
import Link from "next/link";
import {useTranslations} from "next-intl";

interface CategoryPageClientProps {
  categories: CategoryType[];
  page?: CategoryPageType;
}

export default function CategoryPageClient({categories, page}: CategoryPageClientProps) {
  const t = useTranslations();
  return (
    <div className="container mx-auto lg:max-w-7xl space-y-8 relative">
      {/* Title + Description */}
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{page?.title || t('categoryPage.title')}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{page?.title || t('categoryPage.description')}</p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group relative overflow-hidden bg-muted/50 border border-border hover:border-foreground/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-sm"
          >
            <CardContent>
              <Link
                href={ROUTES.CATEGORY_DETAIL(category.slug)}
                className="block"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-foreground text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>

                  {/* Title + Subtitle */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-foreground font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p
                      className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                {/* Animated border shimmer */}
                <div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000"></div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter */}
      <NewsletterImage/>
    </div>
  );
};
