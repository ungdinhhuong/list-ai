'use client'
import {useState} from 'react'
import HeroSection from "@/components/section/HeroSection"
import SearchBar from "@/components/SearchBar"
import FeaturedToolsSection from "@/components/section/FeaturedToolsSection"
import AllToolsSection from "@/components/section/AllToolsSection"
import NewsletterImage from "@/components/section/newsletter/NewsletterImage";
import NewsletterSimple from "@/components/section/newsletter/NewsletterSimple";
import {ToolType} from "@/types/tool.type";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {PaginatedResponse} from "@/types/api.type";
import {log} from "node:util";

interface HomePageClientProps {
  featuredTools: PaginatedResponse<ToolType>,
  initialTools: PaginatedResponse<ToolType>,
}

export default function HomePageClient({featuredTools, initialTools}: HomePageClientProps) {
  const [pagination, setPagination] = useState(initialTools.meta.pagination);
  const isHasLoadMore = (pagination) => pagination.page < pagination.pageCount;

  const [searchQuery, setSearchQuery] = useState("")
  const [tools, setTools] = useState(initialTools.data);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(isHasLoadMore(pagination));

  const loadMore = async () => {
    setLoading(true);
    const nextPage = pagination.page + 1;

    const res = await fetch(`/api/tools?page=${nextPage}&pageSize=${pagination.pageSize}`);
    const json = await res.json();

    setTools(prev => [...prev, ...json.data]);
    setPagination(json.meta.pagination);
    setHasMore(isHasLoadMore(json.meta.pagination))
    setLoading(false);
  };

  return (
    <div className="container mx-auto lg:max-w-7xl space-y-8">
      <HeroSection/>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <FeaturedToolsSection tools={featuredTools.data}/>

      {/* Newsletter Section */}
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
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load more'
            )}
          </Button>
        </div>
      )}
      <NewsletterSimple/>
    </div>
  )
}