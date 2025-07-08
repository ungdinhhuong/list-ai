'use client';

import React from 'react';
import { Settings, Upload, Users } from 'lucide-react';
import Image from "next/image";

export default function HeroSection() {
  const ads = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      title: "Quảng cáo 1",
      description: "Mô tả sản phẩm hoặc dịch vụ quảng cáo số 1",
      link: "#"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center py-8 lg:py-16 pt-16 px-4 max-w-7xl mx-auto">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
            <Settings className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Discover The Best AI Websites & Tools
        </h1>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
          Explore cutting-edge AI tools and platforms that are transforming industries and empowering innovation worldwide.
        </p>

        <div className="flex justify-center lg:justify-start items-center flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 w-full sm:w-auto justify-center">
            <Upload className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Submit AI Tool</span>
          </button>

          <button className="group bg-background text-foreground px-8 py-3 rounded-full font-semibold border-2 border-border hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 w-full sm:w-auto justify-center">
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Join Community</span>
          </button>
        </div>
      </div>

      {/* Right Advertisement */}
      <div className="w-full lg:w-1/2">
        <div
          className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-105"
          onClick={() => window.open(ads[0].link, '_blank')}
        >
          <div className="aspect-video overflow-hidden">
            <Image
              src={ads[0].image}
              alt={ads[0].title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Overlay with ad info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:from-black/70 dark:via-black/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-2">{ads[0].title}</h3>
              <p className="text-sm opacity-90 leading-relaxed">{ads[0].description}</p>
            </div>
          </div>

          {/* Ad badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
            Quảng cáo
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="absolute top-4 left-10 w-2 h-2 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
