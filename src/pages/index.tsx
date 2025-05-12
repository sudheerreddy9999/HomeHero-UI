import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userDetailsAction } from "@/store/actions/user";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { AppDispatch } from "@/store/config/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const userDetails = useAppSelector((state) => state.user.userDetails);

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch]);
  useEffect(() => {
    if (userDetails) {
      router.push("/home");
    }
  }, [userDetails, router]);
  return <></>;
}
