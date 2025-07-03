'use client'
import React from 'react'
import AllToolsSection from "@/components/section/AllToolsSection"
import {allTools} from "@/data/constants"
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";

export default function AIDetailPage() {
  return (
    <div className="container mx-auto lg:max-w-7xl space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          Nim
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">Nim Video</h1>
      </div>

      <p className="text-gray-400 text-lg mb-8 max-w-2xl">
        All-in-one app for AI video production and generation.
      </p>

      {/* Danh sách tool AI */}
      <AllToolsSection tools={allTools}/>
      <NewsletterImage/>
    </div>
  )
}