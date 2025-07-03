'use client'
import {useState} from 'react'
import HeroSection from "@/components/section/HeroSection"
import SearchBar from "@/components/SearchBar"
import FeaturedToolsSection from "@/components/section/FeaturedToolsSection"
import AllToolsSection from "@/components/section/AllToolsSection"
import {allTools, featuredTools} from "@/data/constants"
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";
import NewsletterSimple from "@/components/section/newsletter/NewsletterSimple";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto lg:max-w-7xl space-y-8">
      <HeroSection/>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <FeaturedToolsSection tools={featuredTools}/>

      {/* Newsletter Section */}
      <section className="mb-8 lg:mb-12">
        <NewsletterImage/>
      </section>

      {/* Danh sách tool AI */}
      <AllToolsSection tools={allTools}/>
      <NewsletterSimple/>
    </div>
  )
}