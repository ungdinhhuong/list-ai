'use client'
import {useState} from 'react'
import HeroSection from "@/components/section/HeroSection"
import SearchBar from "@/components/SearchBar"
import FeaturedToolsSection from "@/components/section/FeaturedToolsSection"
import AllToolsSection from "@/components/section/AllToolsSection"
import {allTools, featuredTools} from "@/data/constants"
import FooterSimple from "@/components/layout/FooterSimple";
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto px-4 lg:max-w-6xl">
      <HeroSection/>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <FeaturedToolsSection tools={featuredTools}/>

      {/* Newsletter Section */}
      <section className="mb-8 lg:mb-12">
        <NewsletterImage/>
      </section>

      {/* Danh sách tool AI */}
      <AllToolsSection tools={allTools}/>

      <FooterSimple/>
    </div>
  )
}