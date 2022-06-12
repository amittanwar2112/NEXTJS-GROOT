import { useState, useEffect } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer'
import TrainHomeContainer from '@components/TrainHome/TrainHomeContainer';
import HomeContextProvider from '@contexts/HomeContext';
import { loadSiemaCarousel } from '@helpers/utils';
import { updatePing } from '@helpers/utils/ping';
import { pushToGa } from '@helpers/gaEvents';
import { knowIfUserIsLoggedIn } from '@helpers/api/commonApi';
import { initiateConfig } from '@helpers/utils/adConfig';
import Faq from '@components/Faq'
import { isMobileDevice } from '@helpers/serverUtils';
import { USE_REDIS_CACHE_SEO,SEO_META_DATA } from '@services/config';
import {checkFaqTemplate} from '@components/Faq/FaqTemplate'

export default function TrainHome(props) {
  const {faqTemplate}  = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasLoginApiResponseRecieved, setHasLoginApiResponseRecieved] = useState(false);

  useEffect(()=>{
    loadSiemaCarousel('carousel');
    // TODO: need to fix this
    //initiateConfig('landing');
    pushToGa('home-page-loaded');
    updatePing();
    // knowIfUserIsLoggedIn().then(resp => {
    //   if(resp) {
    //     setIsLoggedIn(true);
    //     setHasLoginApiResponseRecieved(true);
    //   } else {
    //     setHasLoginApiResponseRecieved(true);
    //   }
    // });
  },[])

  return (
    <>
      <Header />
      <HomeContextProvider>
        <TrainHomeContainer isLoggedIn={isLoggedIn} hasLoginApiResponseRecieved={hasLoginApiResponseRecieved}/>
      </HomeContextProvider>
      <Faq faqTemplateData={faqTemplate} />
      <Footer/>
    </>
  );
}

// Runs only on server side and populates the state data for the components
export const getServerSideProps = async ({ req, res, params, resolvedUrl}) => {

  // TODO: fix the url condition based on desktop and mobile like '/trains/d' or '/trains'
  const { url: key = '' } = req;
	const { NODE_ENV } = process.env;
	const isMobile = isMobileDevice(req.headers['user-agent']);
	const cb = req.query?.cb;
	const hcb = req.query?.hcb;
  const cacheConfigReq = USE_REDIS_CACHE_SEO && NODE_ENV === 'production';
  //console.log("cb,hcb,NODE_ENV=>",cb, hcb, NODE_ENV);
  const sendFaqTemplate = await checkFaqTemplate(cb,hcb,cacheConfigReq,key,req ,res, isMobile);


  return {
    props: {
      faqTemplate : sendFaqTemplate
    }
  };
};
