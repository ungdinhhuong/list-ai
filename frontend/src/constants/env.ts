// Chỉ env public mới được sử dụng trong client-side code
export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://ontoolaz.com'
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.ontoolaz.com'
export const APP_NAME = process.env.APP_NAME || 'OnToolAZ'
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
