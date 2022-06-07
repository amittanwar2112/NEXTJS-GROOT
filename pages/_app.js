import '@styles/globals.css';
import Head from 'next/head';
import { PreconnectLinks } from '@components/Scripts/PreconnectLinks';
import { GoogleAnalytics } from '@components/Analytics/GoogleAnalytics';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tahoe Web</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        {/* <PreconnectLinks /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <Component {...pageProps} />
      {/* <GoogleAnalytics /> */}
    </>
  );
}

export default MyApp;
