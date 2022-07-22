import Document, { Head, Html, Main, NextScript } from "next/document";
import { AppConfig, IS_PROD } from "../constants/Constants";
import { GA_TRACKING_ID } from "../utils/gtag";

class MyDocument extends Document {
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
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
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
            {IS_PROD && (
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
                      (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                      })(window, document, "clarity", "script", "cvp8l02vfi");
                    `,
                }}
              />
            )}

            {AppConfig.enableAdsense && (
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2255854420599519"
                crossOrigin="anonymous"
              />
            )}
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
