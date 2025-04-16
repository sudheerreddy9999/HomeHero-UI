import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import { IoArrowForwardOutline } from "react-icons/io5";
import OtpFeilds from "@/components/otpFeilds";
import { useSelector, useDispatch } from "react-redux";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { sendEmailOtp, getBackToEnterEmail,resetOtpSendSuccessfully } from "@/store/actions/auth";

const Welcome = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { otpSentSuccessfully,resendotp } = useSelector((state: any) => state.auth);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });
  const [otpResendTimer, setOtpResendTimer] = useState(60);
  const [isResendOpt, setResendOtp] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let payload: any = {
        headers: {
          email: values.email,
        },
      };
      dispatch(sendEmailOtp("inital",payload));
    },
  });
  useEffect(() => {
    if (otpSentSuccessfully) {
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
  useEffect(()=>{
    if(resendotp){
        setResendOtp(false);
    }
  },[resendotp])
  const handleLoginSuccess = (credentialResponse: any) => {
    alert(`Login success`);
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
    console.log("Resend Otp", formik.values.email);
    let payload: any = {
      headers: {
        email: formik.values.email || localStorage.getItem("email"),
      },
    };
    setOtpResendTimer(60);
    dispatch(sendEmailOtp("resend",payload));
    dispatch(resetOtpSendSuccessfully());
  };
  return (
    <div className="fixed inset-0 w-full bg-opacity-70 flex items-center justify-center z-50">
      <div className="shadow-2xl  md:w-md p-8  rounded-md flex flex-col justify-center items-center space-y-3">
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
            onClick={() => router.push("/")}
          />
        </div>
        {!otpSentSuccessfully ? (
          <>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleErrorMessage}
            />
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
              <h1>{formik.values.email || localStorage.getItem("email")}</h1>
            </div>
            <div className="my-4">
              <OtpFeilds />
            </div>
            <button className="py-1.5 rounded-md w-full text-white font-bold cursor-pointer bg-primary">
              Verify
            </button>
            <hr className="text-gray-500 shadow-2xs my-3 w-full"></hr>
            {!isResendOpt ? (
              <p className="text-[10px">Otp Resend In {otpResendTimer}</p>
            ) : (
              <p className="text-sm">
                <span
                  className="text-primary cursor-pointer hover:translate-y-1.5"
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
    </div>
  );
};

export default Welcome;
