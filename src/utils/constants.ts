import axios, { AxiosInstance, AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// --- Constants ---
export const constants = {
  apibaseurl: process.env.NEXT_PUBLIC_BASE_URL,
  botapiurl: process.env.NEXT_PUBLIC_BASE_URL_CHAT,
};

// --- API Types ---
export const ApiUrlType = {
  Auth: "AUTH",
  Monetization: "MONETIZATION",
  Post: "POST",
  Bot: "BOT",
} as const;

type ApiType = keyof typeof ApiUrlType;

// --- Axios Config Extension ---
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  apiType?: ApiType;
}

// --- Request Params Type ---
interface RequestParams {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

// --- Axios Instance with Interceptor ---
const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config: CustomAxiosRequestConfig): Promise<CustomAxiosRequestConfig> => {
    const apiType = config.apiType;

    if (apiType === "Bot") {
      config.baseURL = constants.botapiurl;
    } else {
      config.baseURL = constants.apibaseurl;
    }

    const token = Cookies.get("token");
    if (token) {
      config.headers?.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: unknown): Promise<never> => Promise.reject(error)
);

// --- GET Method ---
export const get = async (
  url: string,
  params?: RequestParams,
  apiType?: ApiType
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.get(url, {
      headers: params?.headers,
      params: params?.params,
      apiType,
    } as CustomAxiosRequestConfig);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.message ?? "");
      return error.response;
    } else if (error instanceof Error) {
      console.error(error.message ?? "");
    } else {
      console.error(error, "Unknown Error Found");
    }
  }
};

// --- POST Method ---
export const post = async (
  url: string,
  body?: unknown,
  params?: RequestParams,
  apiType?: ApiType
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.post(url, body, {
      headers: params?.headers,
      params: params?.params,
      apiType,
    } as CustomAxiosRequestConfig);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message ?? "");
    } else {
      console.error(error, "Unknown Error Found");
    }
  }
};

// --- PUT Method ---
export const put = async (
  url: string,
  body?: unknown,
  params?: RequestParams,
  apiType?: ApiType
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.put(url, body, {
      headers: params?.headers,
      params: params?.params,
      apiType,
    } as CustomAxiosRequestConfig);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message ?? "");
    } else {
      console.error(error, "Unknown Error Found");
    }
  }
};
