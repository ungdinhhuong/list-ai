import React from 'react';

import FooterSimple from '@/components/layout/FooterSimple';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/contexts/SidebarProvider';
import { categoryService } from '@/services/category.service';
import { singleTypeService } from '@/services/single-type.service';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const categories = await categoryService.getCategoryTree();
  const resSiteSetting = await singleTypeService.getSiteSetting();
  const siteSetting = resSiteSetting?.data || [];

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen relative bg-background text-foreground xl:pl-64 pt-[61px] xl:pt-0">
        <Sidebar categories={categories} />
        <Header siteSetting={siteSetting} />

        <main className="flex-1 px-4 py-4 py-6 xl:py-8">{children}</main>

        <FooterSimple siteSetting={siteSetting} />
      </div>
    </SidebarProvider>
  );
}
