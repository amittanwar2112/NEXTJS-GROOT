import '@styles/globals.css';
import '@styles/googleFont.css';
import Head from 'next/head';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import ErrorBoundary from '@components/ErrorBoundry';
//import { ReactQueryDevtools } from 'react-query/devtools'
//import { wrapper } from "../redux/stores"
//import { PreconnectLinks } from '@components/Scripts/PreconnectLinks';
import Analytics from '@components/Analytics';
import { pingScript, swRegisterScript, detectNetworkOffline } from '@helpers/serverUtils';
import { isMobile } from '@helpers/utils';
import Script from 'next/script';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});
let flavour = isMobile() ? 'mweb' : 'dweb';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Groot</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        {/* <PreconnectLinks /> */}
        <script type="text/javascript">var starttime = new Date();</script>
      </Head>
      <Script
        id="mobileCheck"
        charSet="UTF-8"
        dangerouslySetInnerHTML={{ __html: `window.__mweb = ${isMobile()}` }}
      />
      <Script
        id="pingScript"
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: pingScript(flavour) }}
      />
      <Script
        id="swRegisterScript"
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: swRegisterScript() }}
      />
      <Script id="networkCheck" dangerouslySetInnerHTML={{ __html: detectNetworkOffline() }} />
      <Script
        type="application/javascript"
        src="https://jsak.goibibo.com/adTech_v1.0/adScript/build/version-gi.min.js"
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ErrorBoundary FallbackComponent={<div>Error Found, Please check the console</div>}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Hydrate>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
//export default wrapper.withRedux(MyApp);
