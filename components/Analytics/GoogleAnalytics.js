//import { useEffect, useState } from 'react';
import Head from 'next/head';
import { gtmTag, gtmURL } from './config';

const isClient = typeof window !== 'undefined';

const GoogleAnalytics = () => {
  if (isClient) {
    return (
      <Head>
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    '${gtmURL}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${gtmTag}');
                    dataLayer = dataLayer || [];`
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="${gtmURL}/ns.html?id=${gtmTag}" height="0" width="0" style="display:none;visibility:hidden">
            </iframe>`
          }}
        />
      </Head>
    );
  } else {
    return null;
  }
};

export default GoogleAnalytics;
