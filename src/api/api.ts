import config from './config';
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create(config);

export default api;
