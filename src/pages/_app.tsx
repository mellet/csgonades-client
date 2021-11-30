import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { FC } from "react";
import { CoreWrapper } from "../core/CoreWrapper";
import { AppThemeProvider } from "../core/settings/AppThemeProvider";
import { useNewPageView } from "../utils/Analytics";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useNewPageView();

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

export default App;
