import { getHeader } from '@services/headerfooter';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script'

export default function Header() {
  const [data, setData] = useState({});
  useEffect(() => {
    getHeader().then((result) => {
      setData(result);
    });
  }, []);
  const { html, criticalStyles, js } = data;
  const javaPart = js?.package || '' ;

  return (
    <>
      <Head>
      <style>
          {criticalStyles}
      </style>
      </Head>
      <Script src={javaPart}></Script>
      <div dangerouslySetInnerHTML={{ __html: html }} className="headerContainer"/>
    </>
  );
}
