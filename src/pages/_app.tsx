import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import DefaultLayout from "../layout/defaultLayout";
import AuthorizedLayout from "@/layout/authorizedLayout";
import { Provider, useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.css";
import store from "../store/config/store";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const { userDetails } = useSelector((state: any) => state.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(userDetails !== undefined);
  }, [userDetails]);

  if (!isReady) {
    return (
      <div className="fixed inset-0 w-full mt-14 bg-opacity-90 flex items-center justify-center z-50">
        <div className="flex justify-center items-center">
          <span className="loading loading-dots loading-xl"></span>
          <p>Loading</p>
        </div>
      </div>
    );
  }
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  // Otherwise use the appropriate layout based on auth state
  return userDetails ? (
    <AuthorizedLayout>
      <Component {...pageProps} />
    </AuthorizedLayout>
  ) : (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default function App(props: AppPropsWithLayout) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) throw new Error("Google Client ID is not defined.");
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <InnerApp {...props} />
      </Provider>
    </GoogleOAuthProvider>
  );
}