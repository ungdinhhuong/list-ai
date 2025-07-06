import {AITool} from "@/types"

export const BADGE = {
  FEATURED: "Featured",
  POPULAR: "Popular",
  NEW: "New",
  TRENDING: "Trending",
  BEST: "Best",
  TOP: "Top",
  PRO: "Pro"
}

export const allTools: AITool[] = [
  {
    id: "6",
    name: "BLACKBOX.AI",
    description: "AI agent transforming work and learning with code completion and...",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Development",
    color: "bg-gray-900"
  },
  {
    id: "7",
    name: "Writesonic",
    description: "Writesonic is a free AI writer for creating SEO-friendly content...",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Writing",
    color: "bg-blue-600"
  },
  {
    id: "8",
    name: "PlayHT",
    description: "Transform text to lifelike speech with diverse languages, emotions...",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Voice",
    color: "bg-white"
  },
  {
    id: "9",
    name: "VideoGen",
    description: "Create AI-generated videos in seconds.",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Video",
    color: "bg-red-500"
  },
  {
    id: "10",
    name: "LogoAI",
    description: "LogoAI is an AI-powered platform that assists businesses in...",
    image: "/api/placeholder/80/80",
    badge: "New",
    category: "Design",
    color: "bg-orange-500"
  },
  {
    id: "11",
    name: "Elai.io",
    description: "Create personalized videos easily from text with AI presenters.",
    image: "/api/placeholder/80/80",
    badge: "New",
    category: "Video",
    color: "bg-gray-800"
  },
  {
    id: "12",
    name: "Pictory",
    description: "Transform text into polished videos automatically with ease.",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Video",
    color: "bg-purple-600"
  },
  {
    id: "13",
    name: "Rytr",
    description: "AI assistant crafts quality content quickly across languages and tones.",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Writing",
    color: "bg-orange-600"
  },
  {
    id: "14",
    name: "BLACKBOX.AI",
    description: "AI agent transforming work and learning with code completion and...",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Development",
    color: "bg-gray-900"
  },
  {
    id: "15",
    name: "Writesonic",
    description: "Writesonic is a free AI writer for creating SEO-friendly content...",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Writing",
    color: "bg-blue-600"
  },
  {
    id: "16",
    name: "PlayHT",
    description: "Transform text to lifelike speech with diverse languages, emotions...",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Voice",
    color: "bg-white"
  },
  {
    id: "17",
    name: "VideoGen",
    description: "Create AI-generated videos in seconds.",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Video",
    color: "bg-red-500"
  },
  {
    id: "18",
    name: "LogoAI",
    description: "LogoAI is an AI-powered platform that assists businesses in...",
    image: "/api/placeholder/80/80",
    badge: "New",
    category: "Design",
    color: "bg-orange-500"
  },
  {
    id: "19",
    name: "Elai.io",
    description: "Create personalized videos easily from text with AI presenters.",
    image: "/api/placeholder/80/80",
    badge: "New",
    category: "Video",
    color: "bg-gray-800"
  },
  {
    id: "20",
    name: "Pictory",
    description: "Transform text into polished videos automatically with ease.",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Video",
    color: "bg-purple-600"
  },
  {
    id: "21",
    name: "Rytr",
    description: "AI assistant crafts quality content quickly across languages and tones.",
    image: "/api/placeholder/80/80",
    badge: "Popular",
    category: "Writing",
    color: "bg-orange-600"
  }
]

export const char2BgColor: Record<string, string> = {
  "A": "bg-red-500",
  "B": "bg-orange-500",
  "C": "bg-amber-500",
  "D": "bg-yellow-500",
  "E": "bg-lime-500",
  "F": "bg-green-500",
  "G": "bg-emerald-500",
  "H": "bg-teal-500",
  "I": "bg-cyan-500",
  "J": "bg-sky-500",
  "K": "bg-blue-500",
  "L": "bg-indigo-500",
  "M": "bg-violet-500",
  "N": "bg-purple-500",
  "O": "bg-fuchsia-500",
  "P": "bg-pink-500",
  "Q": "bg-rose-500",
  "R": "bg-slate-500",
  "S": "bg-gray-500",
  "T": "bg-zinc-500",
  "U": "bg-neutral-500",
  "V": "bg-stone-500",
  "W": "bg-red-800",
  "X": "bg-orange-800",
  "Y": "bg-amber-800",
  "Z": "bg-yellow-800"
}

export const sidebarCategories = [
  {
    id: 0,
    name: "AI Tools",
    icon: "🤖",
    slug: "ai-tools",
    description: "Explore tools for ai tools",
    title: "AI Tools",
    subtitle: "AI Tools & Advertising",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 1,
    name: "AI Marketing",
    icon: "📈",
    slug: "ai-marketing",
    description: "Explore tools for ai marketing",
    title: "AI Marketing",
    subtitle: "AI Marketing & Advertising",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    name: "AI All in One",
    icon: "🎯",
    slug: "ai-all-in-one",
    description: "Explore tools for ai all in one",
    title: "AI All In One",
    subtitle: "AI All In One",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: 3,
    name: "AI Voice Generation",
    icon: "🎙️",
    slug: "ai-voice-generation",
    description: "Explore tools for ai voice generation",
    title: "AI Voice Generation",
    subtitle: "AI Voice Generation & Conversion",
    gradient: "from-green-500 to-blue-600"
  },
  {
    id: 4,
    name: "AI Image Generation",
    icon: "🖼️",
    slug: "ai-image-generation",
    description: "Explore tools for ai image generation",
    title: "AI Image Generation",
    subtitle: "AI Image Generation & Editing",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 5,
    name: "AI Video Generator",
    icon: "🎬",
    slug: "ai-video-generator",
    description: "Explore tools for ai video generator",
    title: "AI Video Generator",
    subtitle: "Discover the best AI Video Generator tools on BenlistAI",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: 6,
    name: "AI Transcribing",
    icon: "📝",
    slug: "ai-transcribing",
    description: "Explore tools for ai transcribing",
    title: "AI Text&Writing",
    subtitle: "Text&Writing",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: 7,
    name: "AI Coding",
    icon: "💻",
    slug: "ai-coding",
    description: "Explore tools for ai coding",
    title: "AI Coding",
    subtitle: "AI Coding & Development",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 8,
    name: "AI Workflow",
    icon: "⚡",
    slug: "ai-workflow",
    description: "Explore tools for ai workflow",
    title: "AI Workflow",
    subtitle: "AI Workflow",
    gradient: "from-gray-500 to-gray-700"
  },
  {
    id: 9,
    name: "AI Music & Audio",
    icon: "🎵",
    slug: "ai-music-and-audio",
    description: "Explore tools for ai music & audio",
    title: "AI Music & Audio",
    subtitle: "AI Music & Audio",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    id: 10,
    name: "AI Chatbot",
    icon: "💬",
    slug: "ai-chatbot",
    description: "Explore tools for ai chatbot",
    title: "AI Chatbot",
    subtitle: "Chatbot",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: 11,
    name: "AI Email",
    icon: "📧",
    slug: "ai-email",
    description: "Explore tools for ai email",
    title: "AI Email",
    subtitle: "Discover the best email tools on BenlistAI",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 12,
    name: "AI Office & Productivity",
    icon: "📊",
    slug: "ai-office-and-productivity",
    description: "Explore tools for ai office & productivity",
    title: "AI Office & Productivity",
    subtitle: "AI Office & Productivity",
    gradient: "from-teal-500 to-green-600"
  },
  {
    id: 13,
    name: "AI Education",
    icon: "🎓",
    slug: "ai-education",
    description: "Explore tools for ai education",
    title: "AI Education",
    subtitle: "AI Education & Translation",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: 14,
    name: "AI Seo Tools",
    icon: "🔍",
    slug: "ai-seo-tools",
    description: "Explore tools for ai seo tools",
    title: "AI Seo Tools",
    subtitle: "AI Seo Tools",
    gradient: "from-lime-500 to-green-600"
  },
  {
    id: 15,
    name: "AI YouTube",
    icon: "📺",
    slug: "ai-youtube",
    description: "Explore tools for ai youtube",
    title: "AI YouTube",
    subtitle: "AI YouTube",
    gradient: "from-red-500 to-pink-600"
  },
  {
    id: 16,
    name: "AI Avatar Generator",
    icon: "👤",
    slug: "ai-avatar-generator",
    description: "Explore tools for ai avatar generator",
    title: "AI Avatar Generator",
    subtitle: "AI Avatar Generator",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    id: 17,
    name: "AI UGC Video Generator",
    icon: "🎭",
    slug: "ai-ugc-video-generator",
    description: "Explore tools for ai ugc video generator",
    title: "AI UGC Video Generator",
    subtitle: "AI UGC Video Generator",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    id: 18,
    name: "AI Other",
    icon: "🔧",
    slug: "ai-other",
    description: "Explore tools for ai other",
    title: "AI Other",
    subtitle: "Other",
    gradient: "from-slate-500 to-gray-600"
  }
];

export const PAGE_SIZE = 10;



















