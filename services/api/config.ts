import { API_URL } from "@/config";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

let apiInstance: AxiosInstance | null = null;

export const getApiInstance = (): AxiosInstance => {
  if (!apiInstance) {
    console.log(`🌐 Conectando à API em: ${API_URL}`);

    apiInstance = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    apiInstance.interceptors.request.use(
      (config) => {
        console.log(`➡️ [API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    apiInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ [API] Response ${response.status} from ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        console.error("❌ [API] Response error:", error.message);
        return Promise.reject(error);
      }
    );
  }

  return apiInstance;
};

export default getApiInstance;
