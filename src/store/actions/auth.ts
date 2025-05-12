import { apiEndpoints } from "@/utils/apiEndpoints";
import { get , post} from "../../utils/constants";
import Cookies from "js-cookie";
import { AppDispatch } from "../config/store";
import {
  SendOtpPayload,
  VerifyOtpPayload,
  GoogleCredentialResponse,
  // ApiResponse
} from "@/types/auth";
import {
  getUserDetails,
  getOtpSendSuccessfully,
  getInvalidOtp
} from "../reducers/auth";

export const getBackToEnterEmail = ()=>async (dispatch:AppDispatch)=>{
  try {
    dispatch(getOtpSendSuccessfully({status:false}));
  } catch (error) {
    console.error(error);
  }
}

export const sendEmailOtp = (type: string, payload?: SendOtpPayload) => async (dispatch: AppDispatch) => {
  console.log("Resend Otp Enteredrrrrrrrrrrrrrr",payload,"jjjjjjjjjjjjjjjjjjjjjjj")
  try {
    const response = await get(apiEndpoints.SEND_OTP, payload);
    if (response && response.status == 200) {
      if (payload?.headers?.email) {
        localStorage.setItem("email", payload.headers.email);
      }
      console.log("Resend otp Success")
      if(type == "inital"){
        dispatch(getOtpSendSuccessfully({status:true,resend:false}));
      }if(type == "resend"){
        dispatch(getOtpSendSuccessfully({status:true,resend:true}));
      }
    }
  } catch (error: unknown) {
    if(error instanceof Error){
      console.error(error.message);
    }else{
      console.log("Unexpected error", error);
    }
  }
};

export const verifyOtpAction = (payload:VerifyOtpPayload) => async (dispatch: AppDispatch) => {
  console.log(payload,"Vregehejejjejejejj")
  try {
    const response = await get(apiEndpoints.VERIFY_OTP,payload);
    if(response?.status===400){
      dispatch(getOtpSendSuccessfully({status:false}));
    } 
    if(response && response.status===400){
      dispatch(getInvalidOtp({status:true}));
    }
    if( response && response.status ===200){
      Cookies.set("token", response.data.data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      dispatch(getUserDetails(response.data));
    }
  } catch (error: unknown) {
    if(error instanceof Error){
      console.error(error.message);
    }else{
      console.log("Unexpected error", error);
    }
  }
};

export const resetOtpSendSuccessfully = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getOtpSendSuccessfully({status:true}));
  } catch (error) {
    console.error(error);
  }
}

export const resetInvalidOtp = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getInvalidOtp({status:false}));
  } catch (error) {
    console.error(error);
  }
}

export const loginWithGoogle =(credentialResponse:GoogleCredentialResponse)=>async (dispatch:AppDispatch)=>{
  try {
    const response = await post(apiEndpoints.GOOGLE_LOGIN,credentialResponse.body);
    if(response && response.status === 200){
      dispatch(getUserDetails(response.data));
      Cookies.set("token", response.data.data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    }
  } catch (error) {
    console.error(error);
  }
} 