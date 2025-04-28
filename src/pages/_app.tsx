// pages/_app.tsx

import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import DefaultLayout from "../layout/defaultLayout";
import AuthorizedLayout from "@/layout/authorizedLayout";
import Loader from "@/components/Loaders/loader";
import { Provider, useDispatch, useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.css";
import store from "../store/config/store";
import { userDetailsAction } from "@/store/actions/user";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const dispatch: any = useDispatch();
  const { userDetails, isLoading } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch]);
  if (isLoading) {
    return <Loader />;
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
