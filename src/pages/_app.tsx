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
      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="csgonades"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#FFDD00"
        data-position="Right"
        data-x_margin="16"
        data-y_margin="16"
      ></script>
    </>
  );
};

export default withRedux(App);
