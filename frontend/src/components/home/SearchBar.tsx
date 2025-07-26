'use client';

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import BadgeCustom from "@/components/common/BadgeCustom";
import {useTranslations} from "next-intl";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export default function SearchBar() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 0) {
        performSearch(searchQuery);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleResultSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultSelect = (result: any) => {
    setSearchQuery(result.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Hiển thị backdrop blur khi dropdown đang mở */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-4 transition-all duration-300" />
      )}

      <div className="max-w-2xl mx-auto mb-8 lg:mb-12 relative z-5">
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              ref={inputRef}
              placeholder={t('common.searchTools')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (results.length > 0) {
                  setIsOpen(true);
                }
              }}
              className={`w-full pl-12 pr-12 py-3 bg-background text-foreground placeholder-muted-foreground transition-all duration-200 ${
                isOpen
                  ? 'border-border/30 shadow-sm'
                  : 'border-border hover:border-border/70 focus:border-border'
              }`}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-60 max-h-80 overflow-y-auto">
              {isLoading && (
                <div className="px-4 py-6 text-center text-muted-foreground">
                  <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
                  <p>{t('common.searching')}...</p>
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <>
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultSelect(result)}
                      className={`px-4 py-3 cursor-pointer border-b border-border last:border-b-0 transition-colors ${
                        index === highlightedIndex
                          ? 'bg-muted text-foreground'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-gray-200 flex-shrink-0">
                          {result.avatar ? (
                            <img
                              src={result.avatar.startsWith('/')
                                ? STRAPI_URL + result.avatar
                                : result.avatar}
                              alt={result.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold">{result.name?.charAt(0)?.toUpperCase()}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {result.name}
                            </h3>
                            {result.label && (
                              <BadgeCustom badge={result.label} />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/30 border-t border-border">
                    {t('common.resultsFound', { count: results.length })}
                  </div>
                </>
              )}

              {!isLoading && searchQuery && results.length === 0 && (
                <div className="px-4 py-6 text-center text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>Không tìm thấy kết quả nào cho "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
