import { getHeader } from '@services/headerfooter';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import Script from 'next/script'

export default function Header() {
  const { data, isLoading, error } = useQuery('getHeader', getHeader, {
    staleTime: Infinity
  });

  if (isLoading) return 'Loading...'
  if (error) return 'Something went wrong'
  const { html, criticalStyles, js } = data;
  return (
    <>
      <Head>
      <style>
          {criticalStyles}
      </style>
      </Head>
      <Script src={js.package}></Script>
      <div dangerouslySetInnerHTML={{ __html: html }} className="headerContainer"/>
    </>
  );
}
