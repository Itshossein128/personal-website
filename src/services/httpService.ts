import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// Create an Axios instance
const httpService: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to set adminToken
httpService.interceptors.request.use(
  (config) => {
    let adminToken: string | undefined;
    if (typeof window !== 'undefined') {
      // client
      adminToken = Cookies.get('adminToken') || 'fallback-client-token';
      console.log('Client: adminToken from cookie:', adminToken);
    } else {
      // server
      adminToken = process.env.ADMIN_TOKEN || 'fallback-server-token';
      console.log('Server: adminToken from env:', adminToken);
    }
    if (adminToken) {
      config.headers['adminToken'] = adminToken;
    } else {
      console.warn('No adminToken found');
    }
    console.log('Final headers:', config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional, for error handling)
httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API request failed:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Define a custom config interface to include the `authenticated` flag
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  authenticated?: boolean;
}

// Generic request functions with typed data
export const get = <T>(url: string, config: CustomAxiosRequestConfig = {}) =>
  httpService.get<T>(url, config).then((res: AxiosResponse<T>) => res.data);

export const post = <T, D = unknown>(url: string, data: D, config: CustomAxiosRequestConfig = {}) =>
  httpService.post<T>(url, data, config).then((res: AxiosResponse<T>) => res.data);

export const put = <T, D = unknown>(url: string, data: D, config: CustomAxiosRequestConfig = {}) =>
  httpService.put<T>(url, data, config).then((res: AxiosResponse<T>) => res.data);

export const del = <T>(url: string, config: CustomAxiosRequestConfig = {}) =>
  httpService.delete<T>(url, config).then((res: AxiosResponse<T>) => res.data);

export default httpService;