'use client';

import {useState} from 'react';
import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import FeaturedToolsSection from "@/components/section/FeaturedToolsSection";
import AllToolsSection from "@/components/section/AllToolsSection";
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";
import NewsletterSimple from "@/components/section/newsletter/NewsletterSimple";
import {ToolType} from "@/types/tool.type";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {PaginatedResponse} from "@/types/api.type";
import {HomePageType} from "@/types/home-page.type";
import {useTranslations} from "next-intl";
import {useFetchApiData} from "@/lib/fetchApiData";

interface HomePageClientProps {
  featuredTools: PaginatedResponse<ToolType>;
  initialTools: PaginatedResponse<ToolType>;
  homePage: HomePageType;
}

export default function HomePageClient({featuredTools, initialTools, homePage}: HomePageClientProps) {
  const [pagination, setPagination] = useState(initialTools.meta.pagination);
  const [tools, setTools] = useState(initialTools.data);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(pagination.page < pagination.pageCount);
  const t = useTranslations();

  const loadMore = async () => {
    setLoading(true);
    const nextPage = pagination.page + 1;

    try {
      const fetchApiData = useFetchApiData();
      const url = `/api/tools?page=${nextPage}&pageSize=${pagination.pageSize}`;
      const json = await fetchApiData<PaginatedResponse<ToolType>>(url);

      setTools(prev => [...prev, ...json.data]);
      setPagination(json.meta.pagination);
      setHasMore(json.meta.pagination.page < json.meta.pagination.pageCount);
    } catch (err) {
      console.error("Load more failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto lg:max-w-7xl space-y-8 text-foreground">
      <HeroSection homePage={homePage}/>
      <SearchBar/>
      <FeaturedToolsSection tools={featuredTools.data}/>

      {/* Newsletter hình ảnh */}
      <section className="mb-8 lg:mb-12">
        <NewsletterImage/>
      </section>

      {/* Danh sách tool AI */}
      <AllToolsSection tools={tools}/>

      {hasMore && (
        <div className="text-center xl:mb-16">
          <Button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-2"
            variant="secondary"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                {t('common.loading')}
              </>
            ) : (
              `${t('common.loadMore')}`
            )}
          </Button>
        </div>
      )}

      <NewsletterSimple/>
    </div>
  );
}
