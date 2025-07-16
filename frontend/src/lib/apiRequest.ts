import axiosClient from "@/lib/axiosClient";
import {getLocale} from "next-intl/server";

export async function apiGet<T = any>(url: string, params: any = {}): Promise<T> {
  const locale = await getLocale();
  return axiosClient.get(url, {
    ...params,
    params: {
      ...params.params,
      locale,
    },
  });
}

export async function apiPost<T = any>(url: string, data: any, params: any = {}): Promise<T> {
  const locale = await getLocale();
  return axiosClient.post(url, data, {
    ...params,
    params: {
      ...params.params,
      locale,
    },
  });
}
