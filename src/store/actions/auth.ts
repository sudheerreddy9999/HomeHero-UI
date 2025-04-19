import { apiEndpoints } from "@/utils/apiEndpoints";
import { get , post} from "../../utils/constants";
import Cookies from "js-cookie";
import {
  getUserDetails,
  getOtpSendSuccessfully,
  getInvalidOtp
} from "../reducers/auth";

export const getBackToEnterEmail = ()=>async (dispatch:any)=>{
  try {
    dispatch(getOtpSendSuccessfully({status:false}));
  } catch (error) {
    console.error(error);
  }
}

export const sendEmailOtp = (type: string, payload?: any) => async (dispatch: any) => {
  console.log("Resend Otp Entered")
  try {
    const response = await get(apiEndpoints.SEND_OTP, payload);
    if (response.status == 200) {
      localStorage.setItem("email", payload.headers.email);
      console.log("Resend otp Success")
      if(type == "inital"){
        dispatch(getOtpSendSuccessfully({status:true,resend:false}));
      }if(type == "resend"){
        dispatch(getOtpSendSuccessfully({status:true,resend:true}));
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export const verifyOtpAction = (payload:any) => async (dispatch: any) => {
  try {
    const response = await get(apiEndpoints.VERIFY_OTP,payload);
    if(response.status===400){
      dispatch(getOtpSendSuccessfully({status:false}));
    } 
    if(response.status===400){
      dispatch(getInvalidOtp({status:true}));
    }
    if(response.status ===200){
      Cookies.set("token", response.data.data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      dispatch(getUserDetails(response.data));
    }
  } catch (error: any) {
    console.error(error.message);
    dispatch(getInvalidOtp({status:true}));
  }
};

export const resetOtpSendSuccessfully = () => async (dispatch: any) => {
  try {
    dispatch(getOtpSendSuccessfully({status:true}));
  } catch (error) {
    console.error(error);
  }
}

export const resetInvalidOtp = () => async (dispatch: any) => {
  try {
    dispatch(getInvalidOtp({status:false}));
  } catch (error) {
    console.error(error);
  }
}

export const loginWithGoogle =(credentialResponse:any)=>async (dispatch:any)=>{
  try {
    const response = await post(apiEndpoints.GOOGLE_LOGIN,credentialResponse.body);
    if(response.status === 200){
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