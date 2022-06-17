import { getHeader } from '@services/headerfooter';
//import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import Script from 'next/script'

const isStickyHeader = true;
const isloginPersuation = false;

export default function Header() {
  // const [render, setRender] = useState(false);
  const { data, isLoading, error } = useQuery('getHeader', getHeader, {
    staleTime: Infinity
  });

//   useEffect(() => {
//     setRender(true);
//  }, []);

  function handleLogoutSuccess(){
		window.location.reload();
	}

  if (isLoading) return 'Loading...'
  if (error) return 'Something went wrong'
  const { html, criticalStyles, js } = data || {};
  return (
    <>
      <Head>
        <style>
            {criticalStyles}
        </style>
      </Head>
      <Script 
        src={js.package}
        onLoad={() =>{
          $HappyHeader.ready(function(){
            $HappyHeader.render({
              lobName: 'trains',
              sticky: isStickyHeader,
              onLogoutSuccess: handleLogoutSuccess,
              loginPersuation: isloginPersuation
            });
          })
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: html }} className="headerContainer"/>
    </>
  );
}
