// app/page.tsx
'use client'
import { useState } from 'react'
import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import HeroSection from "@/components/section/HeroSection"
import SearchBar from "@/components/SearchBar"
import FeaturedToolsSection from "@/components/section/FeaturedToolsSection"
import AllToolsSection from "@/components/section/AllToolsSection"
import { featuredTools, allTools } from "@/data/constants"
import FooterSimple from "@/components/layout/FooterSimple";
import NewsletterSimple from "@/components/NewsletterSimple";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white xl:pl-64">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1">
          <div className="container mx-auto lg:max-w-6xl">
            <HeroSection />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FeaturedToolsSection tools={featuredTools} />

            {/* Newsletter Section */}
            <section className="mb-8 lg:mb-12 px-4">
              <NewsletterSimple />
            </section>

            <AllToolsSection tools={allTools} />

            <FooterSimple/>
          </div>
        </main>
      </div>
    </div>
  )
}