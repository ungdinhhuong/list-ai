interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
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

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded"></div>
            <span className="text-lg lg:text-xl font-bold">BenListAI</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm">
          <span className="text-gray-300 hover:text-white cursor-pointer">Categories</span>
          <span className="text-gray-300 hover:text-white cursor-pointer">Blog</span>
          <span className="text-gray-300 hover:text-white cursor-pointer">About</span>
          <span className="text-gray-300 hover:text-white cursor-pointer">Advertise</span>
          <span className="text-gray-300 hover:text-white cursor-pointer">Submit</span>
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