// lib/httpService.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// Create an Axios instance
const httpService: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


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

// Generic request functions
export const get = <T>(url: string, config: CustomAxiosRequestConfig = {}) =>
    httpService.get<T>(url, config).then((res: AxiosResponse<T>) => res.data);

export const post = <T>(url: string, data: any, config: CustomAxiosRequestConfig = {}) =>
    httpService.post<T>(url, data, config).then((res: AxiosResponse<T>) => res.data);

export const put = <T>(url: string, data: any, config: CustomAxiosRequestConfig = {}) =>
    httpService.put<T>(url, data, config).then((res: AxiosResponse<T>) => res.data);

export const del = <T>(url: string, config: CustomAxiosRequestConfig = {}) =>
    httpService.delete<T>(url, config).then((res: AxiosResponse<T>) => res.data);

export default httpService;