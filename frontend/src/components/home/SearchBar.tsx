'use client';

import {Loader2, Search, Send, X} from 'lucide-react';
import Image from 'next/image';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import React, {useEffect, useRef, useState} from 'react';

import BadgeCustom from '@/components/common/BadgeCustom';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {STRAPI_URL} from '@/constants/env';

interface SearchBarProps {
  q?: string;
}

export default function SearchBar({q = ''}: SearchBarProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(q);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);


  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        performSearch(searchQuery.trim());
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tools?page=1&pageSize=10&q=${encodeURIComponent(query)}`);
      const data = await response.json();
      const rawResults = data.data || [];

      const formatted = rawResults.map((item: any) => {
        const avatarUrl = item.avatar?.formats?.thumbnail?.url || item.avatar?.url || '';
        const label = (item.badge || '').toLowerCase();

        return {
          id: item.id,
          slug: item.slug, // dùng cho điều hướng chi tiết
          name: item.name,
          description: item.description,
          label,
          avatar: avatarUrl,
        };
      });

      setResults(formatted);
      setIsOpen(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buildDetailUrl = (r: any) => (r?.slug ? `/ai/${r.slug}` : `/ai?id=${r.id}`);

  const handleResultSelect = (result: any) => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    setSearchQuery('');
    router.push(buildDetailUrl(result));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setIsOpen(false);
    setHighlightedIndex(-1);
    router.push(`/ai?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Nếu đang mở list và có highlight, Enter sẽ chọn item. Ngược lại để form submit xử lý.
    if (e.key === 'Enter' && isOpen && results.length > 0 && highlightedIndex >= 0) {
      e.preventDefault();
      handleResultSelect(results[highlightedIndex]);
      return;
    }

    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();

    // Xoá chỉ param q, giữ nguyên các param khác (nếu có)
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    const nextUrl = params.toString() ? `${pathname}?${params}` : pathname;

    router.replace(nextUrl, { scroll: false });
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-4 transition-all duration-300"/>}

        <div className="w-full mx-auto mb-8 lg:my-12 relative z-5">
          <div className="relative" ref={searchRef}>
            {/* Form để Enter submit điều hướng /ai?q=... */}
            <form onSubmit={onSubmit} className="flex items-stretch gap-2.5">
              <div className="relative flex-1">
                {/* Icon to hơn */}
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6"/>

                <Input
                  ref={inputRef}
                  placeholder={t('common.searchTools')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (results.length > 0) setIsOpen(true);
                  }}
                  // Tăng kích thước input
                  className={`w-full h-12 md:h-14 pl-12 pr-12 text-base md:text-lg rounded-2xl bg-background
        text-foreground placeholder-muted-foreground transition-all duration-200
        ${isOpen ? 'border-border/30 shadow-sm' : 'border-border hover:border-border/70 focus:border-border'}`}
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6"/>
                  </button>
                )}
              </div>

              {/* Nút cùng chiều cao, font to hơn, icon + text cân */}
              <Button
                type="submit"
                disabled={!searchQuery.trim() || isLoading}
                className="w-auto md:w-42 h-12 md:h-14 px-5 md:px-6 text-white rounded-2xl inline-flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin"/>
                ) : (
                  <>
                    <Send className="w-5 h-5 md:w-6 md:h-6"/>
                    {t('common.search')}
                  </>
                )}
              </Button>
            </form>


            {isOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-60 max-h-80 overflow-y-auto">
                {isLoading && (
                  <div className="px-4 py-6 text-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin"/>
                    <p>{t('common.searching')}...</p>
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <>
                    {results.map((result, index) => (
                      <div
                        key={result.id}
                        onClick={() => handleResultSelect(result)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={`px-4 py-3 cursor-pointer border-b border-border last:border-b-0 transition-colors ${
                          index === highlightedIndex ? 'bg-muted text-foreground' : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-gray-200 flex-shrink-0">
                            {result.avatar ? (
                              <Image
                                src={result.avatar.startsWith('/') ? STRAPI_URL + result.avatar : result.avatar}
                                alt={result.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-bold">{result.name?.charAt(0)?.toUpperCase()}</span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground truncate">{result.name}</h3>
                              {result.label && <BadgeCustom badge={result.label}/>}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/30 border-t border-border">
                      {t('common.searchResultTotal', {count: results.length})}
                    </div>
                  </>
                )}

                {!isLoading && searchQuery && results.length === 0 && (
                  <div className="px-4 py-6 text-center text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-40"/>
                    <p>{t('common.notFoundResult')} &quot;{searchQuery}&quot;</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
    </>
  );
}
