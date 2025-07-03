'use client'
import React from 'react'
import AllToolsSection from "@/components/section/AllToolsSection"
import {allTools} from "@/data/constants"
import {Button} from '@/components/ui/button';
import {ExternalLink} from 'lucide-react';
import AIInfoCard from "@/app/ai/[slug]/AIInfoCard";
import AIContent from "@/app/ai/[slug]/AIContent";
import BadgeCustom from "@/components/common/BadgeCustom";
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";

export default function AIDetailPage() {
  return (
    <div className="container mx-auto lg:max-w-4xl space-y-6 xl:space-y-8">
      <BadgeCustom badge={"Featured"} title="Nim Video"/>

      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          Nim
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">Nim Video</h1>
      </div>

      <p className="text-gray-400 text-lg max-w-2xl">
        All-in-one app for AI video production and generation.
      </p>

      <Button className="bg-gray-700 hover:bg-gray-600 text-white">
        Visit Website
        <ExternalLink className="ml-2 w-4 h-4"/>
      </Button>

      {/* Info Card */}
      <AIInfoCard/>

      {/* Nội dung */}
      <AIContent/>

      {/* Danh sách tool AI */}
      <AllToolsSection tools={allTools} lengthItems={3}/>

      <NewsletterImage/>
    </div>
  )
}