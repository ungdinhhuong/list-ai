'use client'
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {ROUTES} from "@/constants/routes";
import {useSidebar} from "@/contexts/SidebarProvider";
import {CategoryType} from "@/types/category.type";

interface SidebarProps {
  categories: CategoryType[];
}

export default function Sidebar({categories}: SidebarProps) {
  const {sidebarOpen, setSidebarOpen} = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [sidebarOpen]);

  const handleClick = (category: CategoryType) => {
    setSidebarOpen(false);
    router.push(ROUTES.CATEGORY_DETAIL(category.slug));
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64
        bg-gray-900 border-r border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        xl:translate-x-0
        overflow-y-auto
      `}>
        {/* Mobile Close Button */}
        <div className="xl:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
            aria-label="Đóng sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-1">
          {categories.map((category, index) => {
            const isActive = pathname === ROUTES.CATEGORY_DETAIL(category.slug);

            return (
              <div
                key={index}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded cursor-pointer transition-colors
                  ${isActive
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
                `}
                onClick={() => handleClick(category)}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
