import axios from 'axios'

const instance = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337") + '/api',
})

instance.interceptors.request.use(function (config: any) {
  if (typeof window === 'undefined' && process.env.STRAPI_API_TOKEN) {
    config.headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  return config;
}, function (error: any) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response: any) {
  return response && response.data ? response.data : response;
}, function (error: any) {
  console.log(error)
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance
