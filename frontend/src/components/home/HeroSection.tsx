'use client';

import {Users} from 'lucide-react';
import {useTranslations} from 'next-intl';
import React from 'react';

import {useGlobalData} from '@/contexts/GlobalProvider';
import {HomePageType} from '@/types/home-page.type';

interface HeroSectionProps {
  homePage: HomePageType;
}

export default function HeroSection({homePage}: HeroSectionProps) {
  const t = useTranslations();
  const {siteSetting} = useGlobalData();

  const ads = homePage.ads || [];

  // @ts-ignore
  return (
    <div className="flex flex-col gap-2 items-center max-w-7xl mx-auto mb-10">
      <h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight text-center">
        {homePage.title || 'Discover the Best AI Tools'}
      </h1>

      <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto lg:mx-0 text-center">
        {homePage.description ||
          'Explore the latest and most innovative AI tools to enhance your productivity and creativity. Join our community of AI enthusiasts and discover tools that can transform your workflow.'}
      </p>

      <div
        className="flex justify-center lg:justify-start items-center flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <a
          href={siteSetting.joinCommunity}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 w-full sm:w-auto justify-center"
        >
          <Users className="w-5 h-5 group-hover:scale-110 transition-transform"/>
          <span>{t('common.joinCommunity')}</span>
        </a>
      </div>
    </div>
  );
}
