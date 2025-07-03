'use client'
import ModeToggle from "@/components/shared/mode-toggle";
import Link from "next/link";
import {ROUTES} from "@/constants/routes";
import {useSidebar} from "@/contexts/SidebarProvider";

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 fixed bg-black w-full z-10 top-0 left-0 xl:static">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-white p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded"></div>
            <span className="text-lg lg:text-xl font-bold">AI Hub</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm">
          <Link href={ROUTES.CATEGORY} className="text-gray-300 hover:text-white cursor-pointer">Categories</Link>
          <Link href={ROUTES.ABOUT} className="text-gray-300 hover:text-white cursor-pointer">About</Link>
          {/*<span className="text-gray-300 hover:text-white cursor-pointer">Submit</span>*/}
          <ModeToggle/>
        </div>

        {/* Mobile Menu Dropdown */}
        <button className="md:hidden text-white p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </header>
  )
}