import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { FC } from "react";
import { withRedux } from "../utils/WithRedux";
import { CoreWrapper } from "../core/CoreWrapper";
import { AppThemeProvider } from "../core/settings/AppThemeProvider";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppThemeProvider>
        <CoreWrapper>
          <Component {...pageProps} />
        </CoreWrapper>
      </AppThemeProvider>
    </>
  );
};

export default withRedux(App);
