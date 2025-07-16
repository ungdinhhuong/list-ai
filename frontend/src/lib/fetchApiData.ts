import {useLocale} from "next-intl";

import {getLocale} from "next-intl/server";
import axiosClient from "@/services/axiosClient";

type FetchApiDataParams = {
  path: string;
  page?: number;
  pageSize?: number;
  params?: Record<string, any>;
};

export async function fetchApiDataServer<T>({
                                              path,
                                              page = 1,
                                              pageSize = 20,
                                              params = {},
                                            }: FetchApiDataParams): Promise<T> {
  const locale = await getLocale();

  const queryObj = {page, pageSize, locale, ...params};
  const buildQueryString = (obj: Record<string, any>) =>
    Object.entries(obj)
      .filter(([_, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");

  const url =
    path.startsWith("/")
      ? `${path}?${buildQueryString(queryObj)}`
      : `/${path}?${buildQueryString(queryObj)}`;

  const res = await axiosClient.get(url);
  return res.data as T;
}


export function useFetchApiData() {
  const locale = useLocale();

  return async function fetchApiData<T>(
    path: string,
    options?: { page?: number; pageSize?: number; params?: Record<string, any> }
  ): Promise<T> {
    const {page = 1, pageSize = 20, params = {}} = options || {};
    const queryObj = {page, pageSize, locale, ...params};
    const buildQueryString = (obj: Record<string, any>) =>
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&");
    const url = `${path}?${buildQueryString(queryObj)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    const json = await res.json();
    if (!json?.data) throw new Error("Invalid response format");
    return json as T;
  };
}
