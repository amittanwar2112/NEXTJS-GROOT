import { useState, useEffect } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import dynamic from 'next/dynamic';
import Header from '@components/Header';
//import Footer from '@components/Footer'
import TrainHomeContainer from '@components/TrainHome/TrainHomeContainer';
import Faq from '@components/Faq';
import { checkFaqTemplate } from '@components/Faq/FaqTemplate';
import HomeContextProvider from '@contexts/HomeContext';
import { loadSiemaCarousel } from '@helpers/utils';
import { updatePing } from '@helpers/utils/ping';
import { pushToGa } from '@helpers/gaEvents';
import { knowIfUserIsLoggedIn } from '@helpers/api/commonApi';
import { initiateConfig } from '@helpers/utils/adConfig';
import { isMobileDevice } from '@helpers/serverUtils';
import { USE_REDIS_CACHE_SEO } from '@services/config';
import { getHeader } from '@services/headerfooter';

const Footer = dynamic(() => import('@components/Footer'));

export default function TrainHome(props) {
  const { faqTemplate } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasLoginApiResponseRecieved, setHasLoginApiResponseRecieved] = useState(false);

  useEffect(() => {
    loadSiemaCarousel('carousel');
    initiateConfig('landing');
    pushToGa('home-page-loaded');
    updatePing();
    knowIfUserIsLoggedIn().then((resp) => {
      if (resp) {
        setIsLoggedIn(true);
        setHasLoginApiResponseRecieved(true);
      } else {
        setHasLoginApiResponseRecieved(true);
      }
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <HomeContextProvider>
        <TrainHomeContainer
          isLoggedIn={isLoggedIn}
          hasLoginApiResponseRecieved={hasLoginApiResponseRecieved}
        />
      </HomeContextProvider>
      <div style={{ backgroundColor: '#eff3f8' }}>
        <Faq faqTemplateData={faqTemplate} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

// Runs only on server side and populates the state data for the components
export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await Promise.all([
    // getting header data on server-side
    queryClient.prefetchQuery('getHeader', getHeader, {
      staleTime: Infinity // the data never goes stale unless the query is invalidated
    })
  ]);

  const { req, res, query } = context;
  // TODO: fix the url condition based on desktop and mobile like '/trains/d' or '/trains'
  //const { url: key = '' } = req;
  //const keyUrl = key.split('?')[0];
  const { NODE_ENV } = process.env;
  const isMobile = isMobileDevice(req.headers['user-agent']);
  const cb = query?.cb;
  const hcb = query?.hcb;
  const cacheConfigReq = USE_REDIS_CACHE_SEO && NODE_ENV === 'production';
  //console.log("cb,hcb,NODE_ENV=>",cb, hcb, NODE_ENV);
  const sendFaqTemplate = await checkFaqTemplate(
    cb,
    hcb,
    cacheConfigReq,
    '/trains',
    req,
    res,
    isMobile
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      faqTemplate: sendFaqTemplate
    }
  };
};
