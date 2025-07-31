import { format, formatDistanceToNow,formatISO, isToday, isYesterday, parseISO } from 'date-fns'

/**
 * Format ISO string to 'MMM dd yyyy' (e.g. 'Jul 30 2025')
 */
export const formatDateShort = (iso: string | Date): string => {
  return format(new Date(iso), 'MMM dd yyyy')
}

/**
 * Format ISO string to 'dd/MM/yyyy'
 */
export const formatDateVN = (iso: string | Date): string => {
  return format(new Date(iso), 'dd/MM/yyyy')
}

/**
 * Format ISO string to 'HH:mm dd/MM/yyyy'
 */
export const formatDateTime = (iso: string | Date): string => {
  return format(new Date(iso), 'HH:mm dd/MM/yyyy')
}

/**
 * Show relative time from now (e.g. '5 minutes ago')
 */
export const fromNow = (iso: string | Date): string => {
  return formatDistanceToNow(new Date(iso), { addSuffix: true })
}

/**
 * Trả về "Hôm nay", "Hôm qua" hoặc định dạng dd/MM/yyyy
 */
export const formatHumanDate = (iso: string | Date): string => {
  const date = new Date(iso)

  if (isToday(date)) return 'Hôm nay'
  if (isYesterday(date)) return 'Hôm qua'

  return formatDateVN(date)
}
