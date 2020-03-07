import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta charSet="utf-8" />
          <link
            rel="shortcut icon"
            href="/icons/favicon.ico"
            type="image/x-icon"
          />
          <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
            rel="stylesheet"
            key="google-font-roboto"
            media="all"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `var ezoicId = 179726;`,
            }}
          ></script>
          <script
            type="text/javascript"
            src="//go.ezoic.net/ezoic/ezoic.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
