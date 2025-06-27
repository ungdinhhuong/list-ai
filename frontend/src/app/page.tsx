// app/page.tsx
'use client'
import { useState } from 'react'
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import HeroSection from "@/components/HeroSection"
import SearchBar from "@/components/SearchBar"
import FeaturedToolsSection from "@/components/FeaturedToolsSection"
import AllToolsSection from "@/components/AllToolsSection"
import AIToolsNewsletter from "@/components/AIToolsNewsletter"
import { featuredTools, allTools } from "@/data/constants"
import Footer from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <HeroSection />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FeaturedToolsSection tools={featuredTools} />

            {/* Newsletter Section */}
            <section className="mb-8 lg:mb-12 px-4">
              <AIToolsNewsletter />
            </section>

            <AllToolsSection tools={allTools} />

            <Footer/>
          </div>
        </main>
      </div>
    </div>
  )
}