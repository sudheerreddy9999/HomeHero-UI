import axios from "axios";
import Cookies from "js-cookie";

export const constants = {
  apibaseurl: process.env.NEXT_PUBLIC_BASE_URL,
};

export const ApiUrlType = {
  Auth: "AUTH",
  Monetization: "MONETIZATION",
  Post: "POST",
};
const axiosInstance: any = axios.create();
axiosInstance.interceptors.request.use(
  async (config: any) => {
    config.baseURL = constants.apibaseurl;
    const token = Cookies.get("token"); 
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export const get = async (url: any, params?: any, apiType?: any) => {
  try {
    const response = await axiosInstance.get(url, {
      headers: params?.headers ?? {},
      params: params?.params ?? {},
      baseURL: "",
      apiType: apiType,
    });
    return response;
  } catch (error: any) {
    console.error(error.message ?? "");
  }
};

export const post = async (url: any, body?: any, params?: any) => {
  try {
    const response = await axiosInstance.post(url, body, {
      headers: params?.headers ?? {},
      params: params?.params ?? {},
    });
    return response;
  } catch (error: any) {
    console.error(error.message ?? "");
  }
};
export const put = async (url: any, body?: any, params?: any) => {
  try {
    const response = await axiosInstance.put(url, body, {
      headers: params?.headers ?? {},
      params: params?.params ?? {},
    });
    return response;
  } catch (error: any) {
    console.error(error.message ?? "");
  }
}
