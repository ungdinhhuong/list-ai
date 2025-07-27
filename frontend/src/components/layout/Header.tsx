'use client'

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import ModeToggle from "@/components/shared/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { useSidebar } from "@/contexts/SidebarProvider";

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const t = useTranslations();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownItemClick = (e: React.MouseEvent) => {
    // Prevent event bubbling to avoid closing dropdown prematurely
    e.stopPropagation();
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Cleanup function to ensure no lingering effects
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    };

    if (dropdownOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when dropdown is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [dropdownOpen]);

  return (
    <>
      {/* Backdrop overlay for mobile dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeDropdown}
        />
      )}

      <header className="bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 fixed w-full z-10 top-0 left-0 xl:static bg-background text-foreground transition-colors">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="xl:hidden text-foreground p-1"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href={ROUTES.HOME} className="flex items-center space-x-2">
              <div className="w-26 h-8 relative">
                <Image
                  src={'/ontoolaz_logo.png'}
                  alt="OnToolAZ"
                  fill
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm">
            <Link href={ROUTES.CATEGORY} className="text-muted-foreground hover:text-foreground transition-colors">
              {t('common.categories')}
            </Link>
            <Link href={ROUTES.ABOUT} className="text-muted-foreground hover:text-foreground transition-colors">
              {t('common.about')}
            </Link>
            <LanguageSwitcher/>
            <ModeToggle />
          </div>

          {/* Mobile Options Dropdown */}
          <div className="md:hidden relative">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="text-foreground p-1 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 relative z-50"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuItem asChild>
                  <Link
                    href={ROUTES.CATEGORY}
                    className="flex items-center !gap-0"
                    onClick={closeDropdown}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {t('common.categories')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={ROUTES.ABOUT}
                    className="flex items-center !gap-0"
                    onClick={closeDropdown}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('common.about')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onSelect={(e) => e.preventDefault()}
                >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {t('languageSwitcher.chooseLanguage')}
                </span>
                  <LanguageSwitcher />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onSelect={(e) => e.preventDefault()}
                >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  {t('common.theme')}
                </span>
                  <ModeToggle />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}
