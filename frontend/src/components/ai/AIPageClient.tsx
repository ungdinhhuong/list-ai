'use client';

import {useSearchParams} from "next/navigation";
import {useTranslations} from 'next-intl';
import React, {useEffect, useState} from 'react';

import Pagination from '@/components/common/Pagination';
import TitlePage from '@/components/common/TitlePage';
import SearchBar from "@/components/home/SearchBar";
import ToolCard from '@/components/tool/ToolCard';
import {AIPageType} from '@/types/ai.type';
import {PaginatedResponse} from '@/types/api.type';
import {ToolType} from '@/types/tool.type';

interface AIPageClientProps {
  tools: PaginatedResponse<ToolType>;
  page?: AIPageType;
}

export default function AIPageClient({tools, page}: AIPageClientProps) {
  const t = useTranslations();
  const [results, setResults] = useState<PaginatedResponse<ToolType>>(tools);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');

  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q) {
      performSearch(q);
      setSearchQuery(q);
    } else {
      setResults(tools);
    }
  }, [searchParams, tools]);

  const performSearch = async (query: string) => {
    if (!query) return;
    try {
      const response = await fetch(`/api/tools?page=1&pageSize=10&q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
    }
  };

  return (
    <div className="container mx-auto lg:w-7xl space-y-8 relative">
      <TitlePage title={page?.title || ''} description={page?.description || ''}/>
      <SearchBar q={searchQuery}/>

      {results.data.length === 0 ? (
        <div className="text-muted-foreground text-lg">{t('category.noTools')}</div>
      ) : (
        <div className="grid gap-4 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {results.data.map(tool => (
            <ToolCard key={tool.id} tool={tool}/>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {results.meta && results.meta.pagination.pageCount > 1 && <Pagination meta={results.meta}/>}
    </div>
  );
}
