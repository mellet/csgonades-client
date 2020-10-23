import Document, { Head, Html, Main, NextScript } from "next/document";

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
            <script src="//www.ezojs.com/ezoic/sa.min.js" />
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
