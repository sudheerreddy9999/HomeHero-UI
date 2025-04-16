import { apiEndpoints } from "@/utils/apiEndpoints";
import { get } from "../../utils/constants";
import {
  getUserDetails,
  getOtpSendSuccessfully,
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

export const verifyOtpAction = () => async (dispatch: any) => {
  try {
  } catch (error: any) {
    console.error(error.message);
  }
};

export const resetOtpSendSuccessfully = () => async (dispatch: any) => {
  try {
    dispatch(getOtpSendSuccessfully({status:true}));
  } catch (error) {
    console.error(error);
  }
}