import SearchWidget from '@components/SearchWidget';
import SearchContextProvider from '@contexts/SearchContext';
import AdBanner from '@components/AdBanner';
import RecentSearches from '@components/RecentSearchesDhome';
import CommonAd from "@components/Offers/CommonAd";
import InformationServices from '@components/IrctcSettings/services';
import IrctcSettings from '@components/IrctcSettings/IrctcSettings';

export default function TrainHomeContainer(props) {
  return (
  <div className="homePageWrap">
  <div className="pageBackgroundBlue"></div>
  <div className="pageBackgroundLight"></div>
  <section className="pageContentWrap">
    <h1 className="titleHeader">Book IRCTC train tickets</h1>
    <section className="componentWrap">
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
)
}