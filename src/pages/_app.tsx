import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { FC } from "react";
import { withRedux } from "../utils/WithRedux";
import { CoreWrapper } from "../core/CoreWrapper";
import { createGlobalStyle } from "styled-components";
import { AppThemeProvider } from "../core/settings/AppThemeProvider";
import { Normalize } from "styled-normalize";
import { useRouter } from "next/router";

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    font-family: "Roboto", Helvetica, sans-serif !important;
    font-weight: 300;
    font-size: 16px;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: "Roboto", Helvetica, sans-serif;
    font-weight: 300;
  }

  h1 {
    font-size: 42px;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 32px;
    margin-top: 56px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 24px;
    margin-top: 48px;
  }

  p {
    font-size: 18px;
    margin-bottom: 22px;
  }

  input {
    font-family: "Roboto", sans-serif;
  }

  .lead {
    font-size: 24px;
  }

  code {
    vertical-align: bottom;
  }
`;

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { asPath } = useRouter();

  const isFrontPage = asPath === "/";

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {isFrontPage && (
          <script
            data-ad-client="ca-pub-2255854420599519"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        )}
      </Head>
      <Normalize />
      <GlobalStyle />
      <CoreWrapper>
        <AppThemeProvider>
          <Component {...pageProps} />
        </AppThemeProvider>
      </CoreWrapper>
    </>
  );
};

export default withRedux(App);
