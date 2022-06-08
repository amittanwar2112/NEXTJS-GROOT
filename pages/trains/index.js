import { useState, useEffect } from 'react';
import Header from '@components/Header/index';
import TrainHomeContainer from '@components/TrainHome/TrainHomeContainer';
import HomeContextProvider from '@contexts/HomeContext';
import { loadSiemaCarousel } from '@helpers/utils';
import { updatePing } from '@helpers/utils/ping';
import { pushToGa } from '@helpers/gaEvents';
import { knowIfUserIsLoggedIn } from '@helpers/api/commonApi';
import { initiateConfig } from '@helpers/utils/adConfig';

export default function TrainHome() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasLoginApiResponseRecieved, setHasLoginApiResponseRecieved] = useState(false);

  useEffect(()=>{
    loadSiemaCarousel('carousel');
    // TODO: need to fix this
    //initiateConfig('landing');
    pushToGa('home-page-loaded');
    updatePing();
    knowIfUserIsLoggedIn().then(resp => {
      if(resp) {
        setIsLoggedIn(true);
        setHasLoginApiResponseRecieved(true);
      } else {
        setHasLoginApiResponseRecieved(true);
      }
    });
  },[])

  return (
    <>
      <Header />
      <HomeContextProvider>
        <TrainHomeContainer isLoggedIn={isLoggedIn} hasLoginApiResponseRecieved={hasLoginApiResponseRecieved}/>
      </HomeContextProvider>
    </>
  );
}
