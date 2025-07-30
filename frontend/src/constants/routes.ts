export const ROUTES = {
  HOME: '/',
  AI: '/ai',
  ABOUT: '/about',
  POLICY: '/policy',
  AI_DETAIL: (slug: string) => `/ai/${slug}`,
  CATEGORY: '/category',
  BLOG: '/blog',
  CATEGORY_DETAIL: (slug: string) => `/category/${slug}`,
}
