'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import NewsletterImage from '@/components/section/newsletter/NewsletterImage';
import { sidebarCategories } from '@/constants/constants';

const CategoryDetailPage = () => {
  return (
    <div className="container mx-auto lg:max-w-7xl space-y-8 relative">
      {/* Title + Description */}
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          All-in-one app for AI video production and generation.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {sidebarCategories.map((tool) => (
          <Card
            key={tool.id}
            className="group relative overflow-hidden bg-muted/50 border border-border hover:border-foreground/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-sm"
          >
            <CardContent>
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center text-foreground text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {tool.icon}
                </div>

                {/* Title + Subtitle */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {tool.subtitle}
                  </p>
                </div>
              </div>

              {/* Hover effect gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              {/* Animated border shimmer */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter */}
      <NewsletterImage />
    </div>
  );
};

export default CategoryDetailPage;
