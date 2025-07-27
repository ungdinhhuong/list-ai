import {getLocale} from "next-intl/server";

import axiosClient from "@/lib/axiosClient";

const localeMap = {
  en: 'en',
  vi: 'vi-VN',
  fr: 'fr-FR'
}

export async function apiGet<T = any>(url: string, params: any = {}): Promise<T> {
  const locale = await getLocale();
  return axiosClient.get(url, {
    ...params,
    params: {
      ...params.params,
      locale: localeMap[locale as keyof typeof localeMap] || 'en',
    },
  });
}

export async function apiPost<T = any>(url: string, data: any, params: any = {}): Promise<T> {
  const locale = await getLocale();
  return axiosClient.post(url, data, {
    ...params,
    params: {
      ...params.params,
      locale: localeMap[locale as keyof typeof localeMap] || 'en',
    },
  });
}
