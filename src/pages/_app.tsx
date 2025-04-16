import type { AppProps } from "next/app";
import type { NextPage } from "next";
import DefaultLayout from "../layout/defaultLayout";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.css"
import store from "../store/config/store"
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
type AppPropsWithoutLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithoutLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>);
  return(
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID||''}>
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
    </GoogleOAuthProvider>
  )
}
