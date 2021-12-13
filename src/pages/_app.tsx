import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { FC } from "react";
import { CoreWrapper } from "../core/CoreWrapper";
import { AppThemeProvider } from "../core/settings/AppThemeProvider";
import { SWRConfig } from "swr";

const tenMinutesInMs = 10 * 60 * 1000;

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        dedupingInterval: tenMinutesInMs,
        focusThrottleInterval: tenMinutesInMs,
        revalidateOnFocus: false,
        onError: (err, key) => {
          console.error("# Network error", key, err);
        },
      }}
    >
      <CoreWrapper>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <AppThemeProvider>
          <Component {...pageProps} />
        </AppThemeProvider>
      </CoreWrapper>
    </SWRConfig>
  );
};

export default App;
