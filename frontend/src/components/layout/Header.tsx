'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import {FaBlog, FaEllipsisV, FaGlobe, FaMoon, FaRobot, FaThLarge} from 'react-icons/fa'

import LanguageSwitcher from '@/components/common/LanguageSwitcher'
import ModeToggle from '@/components/shared/mode-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ROUTES } from '@/constants/routes'
import { useSidebar } from '@/contexts/SidebarProvider'

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const t = useTranslations()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navItems = [
    {
      label: t('common.categories'),
      href: ROUTES.CATEGORY,
      icon: <FaThLarge className="w-4 h-4 mr-2" />,
    },
    {
      label: t('common.aiTools'),
      href: ROUTES.AI,
      icon: <FaRobot className="w-4 h-4 mr-2" />,
    },
    {
      label: t('common.blogs'),
      href: ROUTES.BLOG,
      icon: <FaBlog className="w-4 h-4 mr-2" />,
    },
  ]

  const closeDropdown = () => setDropdownOpen(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDropdown()
    }

    if (dropdownOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [dropdownOpen])

  return (
    <>
      {dropdownOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeDropdown} />
      )}

      <header className="bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 fixed w-full z-10 top-0 left-0 xl:static bg-background text-foreground transition-colors">
          <div className="flex items-center space-x-4">
            <button
              aria-label="Toggle sidebar"
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
                  src="/ontoolaz_logo.png"
                  alt="OnToolAZ"
                  fill
                  sizes="true"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <ModeToggle />
          </div>

          {/* Mobile nav */}
          <div className="md:hidden relative">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-foreground p-1 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  aria-label="Open menu"
                  type="button"
                >
                  <FaEllipsisV className="w-5 h-5"/>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 relative z-50">
                {navItems.map(item => (
                  <DropdownMenuItem asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center !gap-0"
                      onClick={closeDropdown}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onSelect={e => e.preventDefault()}
                >
                  <span className="flex items-center"><FaGlobe className="w-4 h-4 mr-2"/>{t('languageSwitcher.chooseLanguage')}</span>
                  <LanguageSwitcher/>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onSelect={e => e.preventDefault()}
                >
                  <span className="flex items-center"><FaMoon className="w-4 h-4 mr-2"/>{t('common.theme')}</span>
                  <ModeToggle/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}
