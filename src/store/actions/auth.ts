import { apiEndpoints } from "@/utils/apiEndpoints";
import { get, post } from "../../utils/constants";
import Cookies from "js-cookie";
import { AppDispatch } from "../config/store";
import {
  SendOtpPayload,
  VerifyOtpPayload,
  GoogleCredentialResponse,
  // ApiResponse
} from "@/types/auth";
import {
  getOtpSendSuccessfully,
  getInvalidOtp,
} from "../reducers/auth";
import { getUserDetails } from "../reducers/user";


export const getBackToEnterEmail = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getOtpSendSuccessfully({ status: false }));
  } catch (error) {
    console.error(error);
  }
};

export const sendEmailOtp =
  (type: string, payload?: SendOtpPayload) => async (dispatch: AppDispatch) => {
    try {
      const response = await get(apiEndpoints.SEND_OTP, payload);
      if (response && response.status == 200) {
        if (payload?.headers?.email) {
          localStorage.setItem("email", payload.headers.email);
        }
        if (type == "inital") {
          dispatch(getOtpSendSuccessfully({ status: true, resend: false }));
        }
        if (type == "resend") {
          dispatch(getOtpSendSuccessfully({ status: true, resend: true }));
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

export const verifyOtpAction =
  (payload: VerifyOtpPayload) => async (dispatch: AppDispatch) => {
    try {
      const response = await get(apiEndpoints.VERIFY_OTP, payload);
      if (response && response.status === 400) {
        dispatch(getInvalidOtp({ status: true }));
      }
      if (response && response.status === 200) {
        Cookies.set("token", response.data.data.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        dispatch(getUserDetails(response.data));
      }
    } catch (error: unknown) {
      if (error instanceof Error) { 
        console.error(error.message);
        dispatch(getInvalidOtp({ status: true }));
         dispatch(getOtpSendSuccessfully({ status: false }));
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

export const resetOtpSendSuccessfully = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getOtpSendSuccessfully({ status: true }));
  } catch (error) {
    console.error(error);
  }
};

export const resetInvalidOtp = () => async () => {
  try {
    // dispatch(getInvalidOtp({ status: false }));
  } catch (error) {
    console.error(error);
  }
};

export const loginWithGoogle =
  (credentialResponse: GoogleCredentialResponse) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await post(
        apiEndpoints.GOOGLE_LOGIN,
        credentialResponse.body
      );
      if (response && response.status === 200) {
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
  };
