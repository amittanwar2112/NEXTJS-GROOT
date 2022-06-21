import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="UTF-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://goibibo.ibcdn.com" />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/quicksand/v29/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/quicksand/v29/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/quicksand/v29/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="https://goibibo.ibcdn.com/styleguide/css/fonts/trains/gotrains_v4.woff2?uufuan"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
