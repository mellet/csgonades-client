import "../utils/css/normalize.css";
import "semantic-ui-css/semantic.min.css";
import "../utils/css/Global.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { FC } from "react";
import { withRedux } from "../utils/WithRedux";
import { CoreWrapper } from "../core/CoreWrapper";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CoreWrapper>
        <Component {...pageProps} />
      </CoreWrapper>
    </>
  );
};

export default withRedux(App);
