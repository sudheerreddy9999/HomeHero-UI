import React, { useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import Image from "@/components/Image/image";
import { userDetailsAction } from "@/store/actions/user";
export default function Home() {
  const dispatch: any = useDispatch();
  const { userDetails } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(userDetailsAction());
  }, [userDetailsAction]);
  useEffect(() => {
    console.log("User details are ", userDetails);
  }, [userDetails]);
  return (
    <>
      <img
        src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
        className="w-full h-[631px]"
      />
    </>
  );
}
