import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { GA_TRACKING_ID } from "../utils/gtag";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <>
        <Html lang="en">
          <Head>
            <meta charSet="utf-8" />
            <link
              rel="shortcut icon"
              href="/icons/favicon.ico"
              type="image/x-icon"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/favicon/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon/favicon-16x16.png"
            />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/favicon/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff"></meta>
            <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
              rel="stylesheet"
              key="google-font-roboto"
              media="all"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Changa+One&display=swap"
              rel="stylesheet"
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
            <Script
              src="//www.ezojs.com/ezoic/sa.min.js"
              strategy="afterInteractive"
            />
          </Head>
          <body id="app">
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}

export default MyDocument;
