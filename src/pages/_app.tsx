import "../utils/css/normalize.css";
import "semantic-ui-css/semantic.min.css";
import "react-image-crop/dist/ReactCrop.css";
import "../utils/css/Global.css";
import { Layout2 } from "../layout/Layout2";
import { withRedux } from "../utils/WithRedux";
import Head from "next/head";

const App = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout2 {...pageProps}>
        <Component {...pageProps} />
      </Layout2>
    </>
  );
};

export default withRedux(App);
