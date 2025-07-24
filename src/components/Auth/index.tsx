import React, { useEffect, useState, useCallback, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useAppSelector } from "@/hooks/useAppSelector";
import OtpFeilds from "@/components/otpFeilds";
import { useDispatch } from "react-redux";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";
import type { AppDispatch } from "@/store/config/store";
import { CredentialResponse } from "@react-oauth/google";
import Loader from "@/components/Loaders/loader";
import { useTheme } from "@/context/ThemeContext";
import * as Yup from "yup";
import {
  sendEmailOtp,
  getBackToEnterEmail,
  resetOtpSendSuccessfully,
  verifyOtpAction,
  resetInvalidOtp,
  loginWithGoogle,
} from "@/store/actions/auth";

type AuthProps = {
  onAuthClose: () => void;
};

const Welcome = ({ onAuthClose }: AuthProps) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const firstRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);
  const dispatch = useDispatch<AppDispatch>();
  const {
    otpSentSuccessfully,
    resendotp,
    invalidOtp,
    loginSuccess,
    errorMessage,
  } = useAppSelector((state) => state.auth);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });
  const [otpResendTimer, setOtpResendTimer] = useState(60);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [enableVerifyBtn, setEnableVerifyBtn] = useState(false);
  const [enableVerifyOtpText, setEnableVerifyBtnText] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(true);
  const [loader, setLoader] = useState(false);
  const [openCover, setOpenCover] = useState(false);
  const [isResendOpt, setResendOtp] = useState<boolean>(false);
  const otpRefValues = useRef<string[]>([]);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setOpenCover(true);
      const payload = {
        headers: {
          email: values.email,
        },
      };
      dispatch(sendEmailOtp("inital", payload));
    },
  });
  useEffect(() => {
    if (otpSentSuccessfully) {
      setOpenCover(false);
      const interval = setInterval(() => {
        setOtpResendTimer((prev: number) => {
          if (prev <= 1) {
            setResendOtp(true);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSentSuccessfully]);
  useEffect(() => {
    if (resendotp) {
      setResendOtp(false);
      setResetTrigger(true);
      setTimeout(() => setResetTrigger(false), 0);
    }
  }, [resendotp]);
  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    setLoader(true);
    if (credentialResponse.credential) {
      const payload = {
        body: {
          googletoken: credentialResponse.credential,
        },
      };
      dispatch(loginWithGoogle(payload));
    } else {
      console.error("Google credential is undefined");
    }
  };
  const handleErrorMessage = () => {
    alert(`Login Failed`);
  };
  const handleOtpBackEmail = () => {
    dispatch(getBackToEnterEmail());
    setResendOtp(false);
    setOtpResendTimer(60);
  };

  const handleResendOtp = () => {
    const payload = {
      headers: {
        email: formik.values.email || localStorage.getItem("email") || "",
      },
    };
    setOtpResendTimer(60);
    if (payload.headers.email) {
      dispatch(sendEmailOtp("resend", payload));
    } else {
      console.error("Email is required to resend OTP");
    }
    dispatch(resetOtpSendSuccessfully());
  };

  const handleOtpChangeValues = useCallback(
    (otp: string[]) => {
      setEnableVerifyBtnText(false);
      dispatch(resetInvalidOtp());
      if (otp.every((value: string) => value !== "")) {
        setEnableVerifyBtn(true);
      } else {
        setEnableVerifyBtn(false);
      }
      otpRefValues.current = otp;
    },
    [dispatch]
  );

  const verifyOtp = () => {
    setLoader(true);
    const otpValue = otpRefValues.current.join("");
    setEnableVerifyBtnText(true);
    const payload = {
      headers: {
        email: formik.values.email || localStorage.getItem("email") || "",
        otp: otpValue,
      },
    };
    dispatch(verifyOtpAction(payload));
  };

  useEffect(() => {
    if (invalidOtp) {
      setEnableVerifyBtnText(false);
      setEnableVerifyBtn(false);
      setLoader(false);
    }
  }, [invalidOtp]);

  useEffect(() => {
    if (loginSuccess) {
      onAuthClose();
    }
  }, [loginSuccess, router, onAuthClose]);
  useEffect(() => {
    if (invalidOtp) {
      setLoader(false);
    }
  }, [invalidOtp]);

  const handleCloseAuth = () => {
    onAuthClose();
  };
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    setOpenLoginModal(false);
  };
  useEffect(() => {
    if (firstRef.current) {
      setHeight(firstRef.current.clientHeight);
    }
  }, []);
  return (
    <>
      {loader && <Loader message="Signing in with Google" />}

      {openLoginModal && (
        <div className="fixed inset-0 w-full   bg-opacity-90 backdrop-blur-[2px] flex items-center justify-center z-999">
          <div
            ref={firstRef}
            className={`shadow-2xl ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
            } w-[95%]  md:w-md p-8  rounded-md flex flex-col justify-center items-center space-y-3`}
          >
            <div className="flex justify-between w-full mb-6">
              {otpSentSuccessfully && (
                <IoChevronBackOutline
                  className="cursor-pointer"
                  size={28}
                  onClick={() => handleOtpBackEmail()}
                />
              )}

              <h1 className="text-xl font-bold">Sign in</h1>
              <IoClose
                size={28}
                className="text-xl font-bold cursor-pointer"
                onClick={() => handleCloseAuth()}
              />
            </div>
            {!otpSentSuccessfully ? (
              <>
                <div
                  className={`${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                  onClick={handleGoogleLogin}
                >
                  <GoogleLogin
                    theme={isDarkMode ? "filled_black" : undefined}
                    onSuccess={handleLoginSuccess}
                    onError={handleErrorMessage}
                  />
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full space-y-6 my-3 mb-6"
                >
                  <div className="flex flex-col items-start justify-center relative">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Enter Your Email"
                      {...formik.getFieldProps("email")}
                      className={`text-md border p-3 rounded-md w-full ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="submit"
                      className="absolute right-[1px] top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-gray-100 hover:h-12 hover:rounded-r-md"
                    >
                      <IoArrowForwardOutline size={28} />
                    </button>
                    {formik.touched.email && formik.errors.email && (
                      <div className="absolute top-full mt-1 text-red-500 text-sm">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                </form>

                <div className="text-[13px] flex flex-col justify-center items-center">
                  <p>By using this website, you agree to our</p>
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Terms and Conditions
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="text-center space-y-2 ">
                  <h1>Enter the Verification code send to </h1>
                  <h1>
                    {formik.values.email || localStorage.getItem("email")}
                  </h1>
                </div>
                <div className="my-4">
                  <OtpFeilds
                    onOtpChange={handleOtpChangeValues}
                    restOtpTrigger={resetTrigger}
                  />
                  {invalidOtp && (
                    <div className="text-red-500 text-sm pt-1">
                      {errorMessage ||
                        "Invalid OTP. Please enter a valid code."}
                    </div>
                  )}
                </div>
                <button
                  className={`py-1.5 rounded-md w-full text-white font-bold  ${
                    enableVerifyBtn
                      ? "bg-[#53c9c2] cursor-pointer"
                      : "bg-[#a6f2ee] cursor-not-allowed"
                  }`}
                  disabled={!enableVerifyBtn}
                  onClick={verifyOtp}
                >
                  {enableVerifyOtpText && (
                    <span className="loading loading-dots  loading-xl"></span>
                  )}{" "}
                  Verify{enableVerifyOtpText && <>ing Otp</>}
                </button>
                <hr className="text-gray-500 shadow-2xs my-3 w-full"></hr>
                {!isResendOpt ? (
                  <p className="text-sm">Otp Resend In {otpResendTimer}</p>
                ) : (
                  <p className="text-sm">
                    <span
                      className="text-[#53c9c2] cursor-pointer hover:translate-y-1.5"
                      onClick={() => handleResendOtp()}
                    >
                      Resend
                    </span>{" "}
                    Verification Code
                  </p>
                )}
              </>
            )}
          </div>
          {openCover && (
            <div className="fixed inset-0 w-full   bg-opacity-90 backdrop-blur-[1px] flex items-center justify-center z-999">
              <div
                className={`shadow-2xl  ${
                  isDarkMode ? "bg-gray-800 text-white" : " text-gray-700"
                } w-[95%]  md:w-md p-8  rounded-md flex flex-col justify-center items-center space-y-3`}
                style={{ height }}
              >
                <span className="loading loading-dots loading-md"></span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Welcome;
