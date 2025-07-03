import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Settings} from "lucide-react"
import React from "react";
import Image from "next/image";

export default function HeroSection() {
  const ads = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      title: "Quảng cáo 1",
      description: "Mô tả sản phẩm hoặc dịch vụ quảng cáo số 1",
      link: "#"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center py-8 lg:py-16 pt-[61px]">
      {/* Left Button */}
      <div className="w-full lg:w-full text-center">
        <div className="flex justify-center mb-4 lg:mb-6">
          <Settings className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400"/>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 px-4">
          Discover The Best AI Websites & Tools
        </h1>

        <div className="flex justify-center items-center flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 lg:mb-8">
          <Button className="max-w-xs w-full sm:w-auto">
            📤 Submit AI
          </Button>
          <Button className="max-w-xs w-full sm:w-auto" variant="secondary">
            👥 Join our community
          </Button>
        </div>
      </div>

      {/* Right quảng cáo */}
      <div className="w-full sm:w-3/4 lg:w-full">
        <Card
          key={ads[0].id}
          className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer py-0"
          onClick={() => window.open(ads[0].link, '_blank')}
        >
          <CardContent className="p-0 relative">
            <div className="h-64 overflow-hidden">
              <Image
                src={ads[0].image}
                alt={ads[0].title}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Overlay với thông tin quảng cáo */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{ads[0].title}</h3>
                <p className="text-sm opacity-90">{ads[0].description}</p>
              </div>
            </div>

            {/* Badge "Quảng cáo" */}
            <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              Quảng cáo
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}