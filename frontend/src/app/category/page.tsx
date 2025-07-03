'use client';
import React from 'react';
import {Card, CardContent} from '@/components/ui/card';
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";
import {sidebarCategories} from "@/data/constants";

const AIToolsDashboard = () => {
  return (
    <div className="container mx-auto lg:max-w-7xl space-y-8 relative">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Categories</h1>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl">
          All-in-one app for AI video production and generation.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {sidebarCategories.map((tool) => (
          <Card
            key={tool.id}
            className="group relative overflow-hidden bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-sm"
          >
            <CardContent>
              <div className="flex items-start space-x-4">
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {tool.title}
                  </h3>
                  <p
                    className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {tool.subtitle}
                  </p>
                </div>
              </div>

              {/* Hover effect gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Animated border effect */}
              <div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Background decorative elements */}
      {/*<div className="fixed inset-0 overflow-hidden pointer-events-none">*/}
      {/*  <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-xl"></div>*/}
      {/*  <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-xl"></div>*/}
      {/*  <div*/}
      {/*    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-2xl"></div>*/}
      {/*</div>*/}

      <NewsletterImage/>
    </div>
  );
};

export default AIToolsDashboard;