import "../utils/css/normalize.css";
import "semantic-ui-css/semantic.min.css";
import "../utils/css/Global.css";
import { Layout } from "../layout/Layout";
import { withRedux } from "../utils/WithRedux";
import Head from "next/head";

const App = ({ Component, pageProps }: any) => {
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
