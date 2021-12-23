import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { FC } from "react";
import { CoreWrapper } from "../core/CoreWrapper";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CoreWrapper>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </CoreWrapper>
  );
};

export default App;
