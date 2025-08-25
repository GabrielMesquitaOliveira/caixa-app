import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Configuração base da API
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // URL do json-server
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`[API] Response ${response.status} from ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error('[API] Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
