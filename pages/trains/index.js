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
import {name} from '@components/Faq/FaqTemplate'

export default function TrainHome(props) {
  console.log(" cleint main=>",props.name);
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
      <Faq/>
      <Footer/>
    </>
  );
}

// Runs only on server side and populates the state data for the components
export const getServerSideProps = async () => {
  const myname = name();
  console.log("server side myname=>",myname);
  return {
    props: {
      name:myname
    }
  };
};
