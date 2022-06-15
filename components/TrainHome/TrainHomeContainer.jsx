import SearchWidget from '@components/SearchWidget';
import SearchContextProvider from '@contexts/SearchContext';
import AdBanner from '@components/AdBanner';
import RecentSearches from '@components/RecentSearchesDhome';
import CommonAd from "@components/Offers/CommonAd";
import InformationServices from '@components/IrctcSettings/services';
import IrctcSettings from '@components/IrctcSettings/IrctcSettings';
import styles from '../../styles/Home.module.css'
export default function TrainHomeContainer(props) {
  return (
    <>
    <div className={`${styles.homePageWrap}`} >
      <div className={`${styles.pageBackgroundBlue}`} ></div>
      <div className={`${styles.pageBackgroundLight}`} ></div>
      <section  className={`${styles.pageContentWrap}`}  >
        <h1 className={`${styles.titleHeader}`} >Book IRCTC train tickets</h1>
        <section className={`${styles.componentWrap}`} >
          <SearchContextProvider>
            <SearchWidget />
          </SearchContextProvider>
          <AdBanner />
        </section>
        <RecentSearches />
        <CommonAd pageName="landing" section="top"/>
        <InformationServices currentPage="home" currentPageGa="DwebHome" />
        <IrctcSettings currentPageGa="DwebHome" />
      </section>
    </div>
    </>
  )
}
