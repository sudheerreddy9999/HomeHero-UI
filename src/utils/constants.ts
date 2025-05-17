import axios, { AxiosInstance, AxiosResponse } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import Cookies from "js-cookie";

export const constants = {
  apibaseurl: process.env.NEXT_PUBLIC_BASE_URL,
};

export const ApiUrlType = {
  Auth: "AUTH",
  Monetization: "MONETIZATION",
  Post: "POST",
} as const;

// type ApiType = keyof typeof ApiUrlType;

interface RequestParams {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    config.baseURL = constants.apibaseurl;
    const token = Cookies.get("token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: unknown): Promise<never> => {
    return Promise.reject(error);
  }
);

export const get = async (
  url: string,
  params?: RequestParams,
  // apiType?: ApiType
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.get(url, {
      headers: params?.headers,
      params: params?.params,
    });
    return response;
  } catch (error:unknown) {
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

export const post = async (
  url: string,
  body?: unknown,
  params?: RequestParams
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.post(url, body, {
      headers: params?.headers,
      params: params?.params,
    });
    return response;
  } catch (error:unknown) {
    if(error instanceof Error){
      console.error(error.message ?? "");
    }else{
      console.error(error,"Unknown Error Found")
    }
  }
};

export const put = async (
  url: string,
  body?: unknown,
  params?: RequestParams
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance.put(url, body, {
      headers: params?.headers,
      params: params?.params,
    });
    return response;
  } catch (error:unknown) {
    if(error instanceof Error){
      console.error(error.message ?? "");
    }else{
      console.error(error,"Unknown Error Found")
    }
  }
};
