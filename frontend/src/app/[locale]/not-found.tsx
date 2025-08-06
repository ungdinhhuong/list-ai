"use client";

import { AlertTriangle, ArrowLeft, Bot, Home, Search, Zap } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from 'react';
import { FaBlog, FaRobot, FaThLarge } from "react-icons/fa";

import { Button } from '@/components/ui/button';
import { ROUTES } from "@/constants/routes";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const Content404Page: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  const navItems = [
    {
      label: t('common.categories'),
      href: ROUTES.CATEGORY,
      icon: <FaThLarge className="w-4 h-4 mr-2"/>,
    },
    {
      label: t('common.aiTools'),
      href: ROUTES.AI,
      icon: <FaRobot className="w-4 h-4 mr-2"/>,
    },
    {
      label: t('common.blogs'),
      href: ROUTES.BLOG,
      icon: <FaBlog className="w-4 h-4 mr-2"/>,
    },
  ]


  useEffect(() => {
    // Generate random floating elements
    const elements: FloatingElement[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setFloatingElements(elements);
  }, []);

  const handleBackHome = (): void => {
    // In real Next.js app: router.push('/') or window.location.href = '/'
    alert('Trong ứng dụng Next.js thực tế, sẽ điều hướng về trang chủ');
  };

  const handleGoBack = (): void => {
    window.history.back();
  };


  return (
    <div
      id="404-container"
      className="relative w-full h-full"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Static gradient overlays */}
        <div
          className="absolute w-48 h-48 lg:w-96 lg:h-96 rounded-full opacity-5 dark:opacity-10 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl top-1/4 left-1/4"/>
        <div
          className="absolute w-32 h-32 lg:w-64 lg:h-64 rounded-full opacity-5 dark:opacity-10 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl bottom-1/4 right-1/4"/>

        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute opacity-5 dark:opacity-10 text-gray-600 dark:text-gray-400"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `float ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`
            }}
          >
            {element.id % 3 === 0 && <Search size={24}/>}
            {element.id % 3 === 1 && <Zap size={24}/>}
            {element.id % 3 === 2 && <Bot size={24}/>}
          </div>
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-5 flex items-center justify-center h-full p-8">
        <div className="text-center max-w-2xl w-full">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1
              className="text-7xl md:text-8xl lg:text-9xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 dark:from-gray-300 dark:via-gray-100 dark:to-gray-300 select-none">
              404
            </h1>
          </div>

          {/* Error Area */}
          <div className="space-y-6">
            {/* Error Icon & Title */}
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mr-4">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400"/>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {t('404.title')}
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('404.subtitle1')}</p>
              <p className="text-gray-600 dark:text-gray-400">{t('404.subtitle2')}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full lg:max-w-sm mx-auto">
              <Button
                onClick={() => router.push(ROUTES.HOME)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Home className="h-5 w-5 mr-1/2"/>
                {t('404.backHome')}
              </Button>

              <Button
                variant="outline"
                onClick={handleGoBack}
                className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 mr-1/2"/>
                {t('404.goBack')}
              </Button>
            </div>

            {/* Quick Links */}
            <div className="pt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t('404.orChoice')}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {navItems.map((link, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
                    onClick={() => {
                      router.push(link.href);
                    }}
                  >
                    {link.icon}
                    <span className="ml-1">{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Fun Statistics */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { label: 'Tools Available', value: '100+', color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Users Helped', value: '50K+', color: 'text-green-600 dark:text-green-400' },
              { label: 'AI Models', value: '24/7', color: 'text-purple-600 dark:text-purple-400' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <div className={`text-xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
          @keyframes float {
              0%, 100% {
                  transform: translateY(0px) rotate(0deg);
              }
              50% {
                  transform: translateY(-20px) rotate(10deg);
              }
          }
      `}</style>
    </div>
  );
};

export default Content404Page;
