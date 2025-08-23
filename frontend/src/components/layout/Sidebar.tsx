'use client';

import {ChevronDown, ChevronRight} from 'lucide-react';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {ROUTES} from '@/constants/routes';
import {useSidebar} from '@/contexts/SidebarProvider';
import {CategoryType} from '@/types/category.type';

interface SidebarProps {
  categories: CategoryType[];
}

export default function Sidebar({categories}: SidebarProps) {
  const {sidebarOpen, setSidebarOpen} = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const [openIds, setOpenIds] = useState<Set<number>>(new Set([categories[0]?.id || 0]));

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [sidebarOpen]);

  const toggleOpen = (id: number) => {
    setOpenIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const renderCategories = (categories: CategoryType[], level = 0) => {
    return categories.map(category => {
      const hasChildren = category.children && category.children.length > 0;
      const isOpen = openIds.has(category.id);

      const handleClick = () => {
        if (hasChildren) {
          toggleOpen(category.id);
        } else {
          setSidebarOpen(false);
          router.push(ROUTES.CATEGORY_DETAIL(category.slug));
        }
      };

      return (
        <div key={category.id}>
          <div
            className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors ${
              pathname === ROUTES.CATEGORY_DETAIL(category.slug)
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
            style={{paddingLeft: `${level * 16 + 12}px`}}
            onClick={handleClick}
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </div>
            {hasChildren && (
              <span className="text-xs">{isOpen ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</span>
            )}
          </div>

          {hasChildren && isOpen && (
            <div className="space-y-1">{renderCategories(category.children ?? [], level + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-11 md:hidden" onClick={() => setSidebarOpen(false)}/>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-12 h-screen w-64
          bg-background border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          xl:translate-x-0
          overflow-y-auto
        `}
      >
        {/* Mobile close button */}
        <div className="xl:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Category list */}
        <div className="p-1.5">{renderCategories(categories)}</div>
      </aside>
    </>
  );
}
