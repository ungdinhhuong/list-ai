'use client'
import React, {useState} from 'react'
import AllToolsSection from "@/components/section/AllToolsSection"
import {allTools} from "@/data/constants"
import FooterSimple from "@/components/layout/FooterSimple";
import {Button} from '@/components/ui/button';
import {ExternalLink} from 'lucide-react';
import AIInfoCard from "@/app/ai/[slug]/AIInfoCard";
import AIContent from "@/app/ai/[slug]/AIContent";
import BadgeCustom from "@/components/common/BadgeCustom";

export default function AIDetailPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto lg:max-w-4xl px-4 pt-8 space-y-8">
      <BadgeCustom badge={"Featured"} title="Nim Video"/>

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

      <Button className="bg-gray-700 hover:bg-gray-600 text-white mb-8">
        Visit Website
        <ExternalLink className="ml-2 w-4 h-4"/>
      </Button>

      {/* Info Card */}
      <AIInfoCard/>

      {/* Nội dung */}
      <AIContent/>

      {/* Danh sách tool AI */}
      <AllToolsSection tools={allTools} lengthItems={3}/>
      <FooterSimple newsletterType='image'/>
    </div>
  )
}