import { AxiosRequestConfig } from 'axios';

export const BASE_URL: string = import.meta.env.VITE_API_URL;

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

export default config;
