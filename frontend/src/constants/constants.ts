import { FaFacebook, FaInstagram, FaTiktok, FaTwitter,FaYoutube } from 'react-icons/fa'

export const BADGE = {
  FEATURED: "Featured",
  POPULAR: "Popular",
  NEW: "New",
  TRENDING: "Trending",
  BEST: "Best",
  TOP: "Top",
  PRO: "Pro"
}

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

export const PAGE_SIZE = 10;


export const SOCIALS = {
  FACEBOOK: {
    name: "Facebook",
    url: "https://facebook.com/ontoolaz",
    icon: FaFacebook
  },
  X: {
    name: "X",
    url: "https://x.com/ontoolaz",
    icon: FaTwitter
  },
  YOUTUBE: {
    name: "YouTube",
    url: "https://youtube.com/@ontoolaz",
    icon: FaYoutube
  },
  TIKTOK: {
    name: "TikTok",
    url: "https://tiktok.com/@ontoolaz",
    icon: FaTiktok
  },
  INSTAGRAM: {
    name: "Instagram",
    url: "https://instagram.com/ontoolaz",
    icon: FaInstagram
  },
}















