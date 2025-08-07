import axios from 'axios';

import { STRAPI_URL } from '@/constants/env';

const instance = axios.create({
  baseURL: STRAPI_URL + '/api',
});

instance.interceptors.request.use(
  function (config: any) {
    if (typeof window === 'undefined' && process.env.STRAPI_API_TOKEN) {
      config.headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: any) {
    return response && response.data ? response.data : response;
  },
  function (error: any) {
    console.log(JSON.stringify(error, null, 2));
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
  }
);

export default instance;
