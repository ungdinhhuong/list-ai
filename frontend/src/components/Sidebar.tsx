interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const sidebarCategories = [
  { name: "AI AI Tools", icon: "🤖", active: true },
  { name: "AI Marketing", icon: "📈" },
  { name: "AI All in One", icon: "🎯" },
  { name: "AI Voice Generation", icon: "🎙️" },
  { name: "AI Image Generation", icon: "🖼️" },
  { name: "AI Video Generator", icon: "🎬" },
  { name: "AI Transcribing", icon: "📝" },
  { name: "AI Coding", icon: "💻" },
  { name: "AI Workflow", icon: "⚡" },
  { name: "AI Music & Audio", icon: "🎵" },
  { name: "AI Chatbot", icon: "💬" },
  { name: "AI Email", icon: "📧" },
  { name: "AI Office & Productivity", icon: "📊" },
  { name: "AI Education", icon: "🎓" },
  { name: "AI Seo Tools", icon: "🔍" },
  { name: "AI YouTube", icon: "📺" },
  { name: "AI Avatar Generator", icon: "👤" },
  { name: "AI UGC Video Generator", icon: "🎭" },
  { name: "AI Other", icon: "🔧" }
]

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
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
        2xl:translate-x-0
        overflow-hidden
      `}>
        {/* Mobile Close Button */}
        <div className="2xl:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-1">
          {sidebarCategories.map((category, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 px-3 py-2 rounded cursor-pointer transition-colors ${
                category.active
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}