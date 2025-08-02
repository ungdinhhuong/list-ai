'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'

import TitlePage from '@/components/common/TitlePage'
import NewsletterImage from '@/components/section/newsletter/NewsletterImage'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import { CategoryPageType, CategoryType } from '@/types/category.type'

interface CategoryPageClientProps {
  categories: CategoryType[]
  page?: CategoryPageType
}

export default function CategoryPageClient({ categories, page }: CategoryPageClientProps) {
  const t = useTranslations()
  console.log('CategoryPageClient categories:', categories)
  return (
    <div className="container mx-auto lg:w-7xl space-y-8 relative">
      <TitlePage title={page?.title || ''} description={page?.description || ''} />

      {categories.map(parent => (
        <div key={parent.id} className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">{parent.name}</h2>
          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {(parent.children || []).map(category => (
              <Card
                key={category.id}
                className="group relative overflow-hidden border border-border hover:border-foreground/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-sm"
              >
                <CardContent>
                  <Link href={ROUTES.CATEGORY_DETAIL(category.slug)} className="block">
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
        </div>
      ))}


      {/* Newsletter */}
      <NewsletterImage />
    </div>
  )
}
