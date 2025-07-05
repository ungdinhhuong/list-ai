export const ROUTES = {
  HOME: "/",
  AI: "/ai",
  ABOUT: "/about",
  AI_DETAIL: (slug: string) => `/ai/${slug}`,
  CATEGORY: "/category",
  CATEGORY_DETAIL: (slug: string) => `/category/${slug}`,
}