import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import DefaultLayout from "../layout/defaultLayout";
import AuthorizedLayout from "@/layout/authorizedLayout";
// import Loader from "@/components/Loaders/loader";
import Image from "@/components/Image/image";
import HeroIcon from "../assets/heroicon.svg";
import { Provider, useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.css";
import store from "../store/config/store";
import { userDetailsAction } from "@/store/actions/user";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ThemeProvider } from "@/context/ThemeContext";
import type { AppDispatch } from "@/store/config/store";
// import useDarkMode from "@/hooks/useDarkMode";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails, isLoading } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(userDetailsAction());
    }
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="fixed inset-0 w-full bg-opacity-90 flex items-center justify-center z-50">
        <div className="flex flex-col justify-center items-center">
          <Image src={HeroIcon} className="w-20  animate-bounce" alt="Loader" />
          <div className="flex">
            <p className="text-xl text-gray-600 px-2 font-semibold">Loading</p>
            <span className="loading loading-dots  loading-xl"></span>
          </div>
        </div>
      </div>
    );
  }

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  const Layout = userDetails ? AuthorizedLayout : DefaultLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default function App(props: AppPropsWithLayout) {
  // const isDarkMode = useDarkMode();
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) throw new Error("Google Client ID is not defined.");
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (localStorage.getItem("theme") === null) {
  //       if (isDarkMode) {
  //         localStorage.setItem(
  //           "theme",
  //           JSON.stringify({ Theme: "Dark", system: "true" })
  //         );
  //       } else {
  //         localStorage.setItem(
  //           "theme",
  //           JSON.stringify({ Theme: "Light", system: "true" })
  //         );
  //       }
  //     }
  //   }
  // }, []);
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider>
        <Provider store={store}>
          <InnerApp {...props} />
        </Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
