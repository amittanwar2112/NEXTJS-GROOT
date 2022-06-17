import Head from 'next/head';
const isClient = typeof window !== 'undefined';

const Hotjar = () => {
  if (isClient) {
    return (
      <Head>
        <script defer
          dangerouslySetInnerHTML={{
            __html: `(function(h, o, t, j, a, r) {
              h.hj = h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:735033,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
          }}
        />
      </Head>
    );
  } else {
    return null;
  }
};

export default Hotjar;