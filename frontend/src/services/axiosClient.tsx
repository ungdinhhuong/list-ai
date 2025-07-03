import axios from 'axios'

const API_URL = process.env.API_URL || "http://localhost:1337/api";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

const instance = axios.create({
  baseURL: API_URL,
})

instance.interceptors.request.use(function (config: any) {
  if (typeof window === "undefined" && API_TOKEN) {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
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
