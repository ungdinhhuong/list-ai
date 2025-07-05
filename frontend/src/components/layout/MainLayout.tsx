import React from "react";
import {ThemeProvider} from "@/components/shared/theme-provider";
import Header from "@/components/layout/Header";
import FooterSimple from "@/components/layout/FooterSimple";
import Sidebar from "@/components/layout/Sidebar";
import {categoryService} from "@/services/category.service";
import {SidebarProvider} from "@/contexts/SidebarProvider";

export default async function MainLayout({children}: { children: React.ReactNode }) {
  const res = await categoryService.getCategories();
  const categories = res?.data || [];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex flex-col min-h-screen relative bg-black text-white xl:pl-64 pt-[61px] xl:pt-0">
          <Sidebar categories={categories}/>
          <Header/>

          <main className="flex-1 px-4 py-4 py-6 xl:py-8">
            {children}
          </main>

          <FooterSimple/>
        </div>
      </SidebarProvider>

    </ThemeProvider>
  );
}
