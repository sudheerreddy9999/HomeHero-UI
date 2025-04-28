import React, { useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import Image from "@/components/Image/image";
import { userDetailsAction } from "@/store/actions/user";
import { useRouter } from "next/navigation";
export default function Home() {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { userDetails } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(userDetailsAction());
  }, [userDetailsAction]);
  useEffect(() => {
    if(userDetails){
      router.push("/home")
    }
  }, [userDetails]);
  return (
    <>
    </>
  );
}
