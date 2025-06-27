import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AdBanner = () => {
  const ads = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      title: "Quảng cáo 1",
      description: "Mô tả sản phẩm hoặc dịch vụ quảng cáo số 1",
      link: "#"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop",
      title: "Quảng cáo 2",
      description: "Mô tả sản phẩm hoặc dịch vụ quảng cáo số 2",
      link: "#"
    },
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      title: "Quảng cáo 1",
      description: "Mô tả sản phẩm hoặc dịch vụ quảng cáo số 1",
      link: "#"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop",
      title: "Quảng cáo 2",
      description: "Mô tả sản phẩm hoặc dịch vụ quảng cáo số 2",
      link: "#"
    }
  ];

  return (
    <div className="w-1/2 md:w-full p-4">
      <Card
        key={ads[0].id}
        className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer py-0"
        onClick={() => window.open(ads[0].link, '_blank')}
      >
        <CardContent className="p-0 relative">
          <div className="h-64 overflow-hidden">
            <img
              src={ads[0].image}
              alt={ads[0].title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Overlay với thông tin quảng cáo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
  );
};

export default AdBanner;