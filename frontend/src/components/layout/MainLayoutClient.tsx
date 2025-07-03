"use client"
import React, {useState} from "react";
import {ThemeProvider} from "@/components/shared/theme-provider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import FooterSimple from "@/components/layout/FooterSimple";

export default function MainLayoutClient({children}: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col min-h-screen relative bg-black text-white xl:pl-64 pt-[61px] xl:pt-0">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <main className="flex-1 px-4 py-4 py-6 xl:py-8">
          {children}
        </main>
        <FooterSimple/>
      </div>
    </ThemeProvider>
  );
}
