import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { FC } from "react";
import { CoreWrapper } from "../core/CoreWrapper";
import { AppThemeProvider } from "../core/settings/AppThemeProvider";
import { ToastProvider } from "../shared-components/toast/ToastContext";
import { SWRConfig } from "swr";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        onError: (err, key) => {
          console.error("# Network error", key, err);
        },
      }}
    >
      <ToastProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <AppThemeProvider>
          <CoreWrapper>
            <Component {...pageProps} />
          </CoreWrapper>
        </AppThemeProvider>
      </ToastProvider>
    </SWRConfig>
  );
};

export default App;
