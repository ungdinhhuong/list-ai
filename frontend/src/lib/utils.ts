import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getBadgeColor = (badge?: string | null) => {
  switch (badge) {
    case "Featured":
      return "bg-orange-500 text-white hover:bg-orange-600"
    case "Popular":
      return "bg-green-500 text-white hover:bg-green-600"
    case "New":
      return "bg-blue-500 text-white hover:bg-blue-600"
    default:
      return "bg-gray-500 text-white hover:bg-gray-600"
  }
}

export const getBadgeOutlineColor = (badge?: string | null) => {
  switch (badge) {
    case "Featured":
      return "border-orange-500 text-orange-400 hover:bg-orange-500/10"
    case "Popular":
      return "border-green-500 text-green-400 hover:bg-green-500/10"
    case "New":
      return "border-blue-500 text-blue-400 hover:bg-blue-500/10"
    default:
      return "border-gray-500 text-gray-400 hover:bg-gray-500/10"
  }
}

export function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")   // thay mọi ký tự không phải a-z, 0-9 thành dấu -
    .replace(/^-+|-+$/g, "")       // bỏ dấu - ở đầu và cuối
    .replace(/-{2,}/g, "-");       // gộp nhiều dấu - liền nhau thành 1
}