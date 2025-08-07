import { STRAPI_URL } from '@/constants/env';

export const renderUrlImage = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${STRAPI_URL}${url}`;
  return `${STRAPI_URL}/${url}`;
};
