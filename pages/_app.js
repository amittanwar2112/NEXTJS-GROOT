import '@styles/globals.css';
import Head from 'next/head';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { Hydrate } from 'react-query/hydration';
//import { ReactQueryDevtools } from 'react-query/devtools'
import { wrapper } from "../redux/stores"
//import { PreconnectLinks } from '@components/Scripts/PreconnectLinks';
//import { GoogleAnalytics } from '@components/Analytics/GoogleAnalytics';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Groot</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        {/* <PreconnectLinks /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link
          rel="preload"
          href="https://goibibo.ibcdn.com/styleguide/css/fonts/trains/gotrains_v4.woff2?uufuan"
          as="font"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
      {/* <GoogleAnalytics /> */}
    </>
  );
}

export default wrapper.withRedux(MyApp);
