import { type ClassValue, clsx } from 'clsx'
import { useLocale } from 'next-intl'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBadgeColor = (badge?: string | null) => {
  switch (badge) {
    case 'Featured':
      return 'bg-amber-600 text-white hover:bg-amber-700'
    case 'Popular':
      return 'bg-emerald-600 text-white hover:bg-emerald-700'
    case 'New':
      return 'bg-sky-600 text-white hover:bg-sky-700'
    default:
      return 'bg-zinc-600 text-white hover:bg-zinc-700'
  }
}

export const getBadgeOutlineColor = (badge?: string | null) => {
  switch (badge) {
    case 'Featured':
      return 'border-amber-600 text-amber-600 hover:bg-amber-600/10'
    case 'Popular':
      return 'border-emerald-600 text-emerald-600 hover:bg-emerald-600/10'
    case 'New':
      return 'border-sky-600 text-sky-600 hover:bg-sky-600/10'
    default:
      return 'border-zinc-600 text-zinc-600 hover:bg-zinc-600/10'
  }
}

export function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-') // thay mọi ký tự không phải a-z, 0-9 thành dấu -
    .replace(/^-+|-+$/g, '') // bỏ dấu - ở đầu và cuối
    .replace(/-{2,}/g, '-') // gộp nhiều dấu - liền nhau thành 1
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
