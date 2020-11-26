import "../utils/css/normalize.css";
import "semantic-ui-css/semantic.min.css";
import "../utils/css/Global.css";
import { Layout } from "../layout/Layout";
import Head from "next/head";
import { AppProps } from "next/app";
import { FC } from "react";
import { withRedux } from "../utils/WithRedux";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default withRedux(App);
