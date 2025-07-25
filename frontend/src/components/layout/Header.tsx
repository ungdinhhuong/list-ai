'use client'

import ModeToggle from "@/components/shared/mode-toggle";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useSidebar } from "@/contexts/SidebarProvider";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {useTranslations} from "next-intl";

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const t = useTranslations();

  return (
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
            <div className="w-34 h-8 relative">
              <Image
                src={'/logo.png'}
                alt="OnToolAZ"
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm">
          <Link href={ROUTES.CATEGORY} className="text-muted-foreground hover:text-foreground transition-colors">
            {t('Common.categories')}
          </Link>
          <Link href={ROUTES.ABOUT} className="text-muted-foreground hover:text-foreground transition-colors">
            {t('Common.about')}
          </Link>
          <LanguageSwitcher/>
          <ModeToggle />
        </div>

        {/* Mobile Options Button */}
        <button className="md:hidden text-foreground p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </header>
  )
}
