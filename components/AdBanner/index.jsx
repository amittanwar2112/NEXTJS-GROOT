import Image from 'next/image';
import OfferCarousel from './OfferCarousel1'
function AdBanner(props) {
  return (
    <section className="homeAdBannerWrap">
      <div className="adBannerWrap">
        <Image src="https://gos3.ibcdn.com/TrainsHomeBanner-1610443393.png" 
          width="100%" 
          height="190"
          alt='banner' />
      </div>
      <div id="carousel"></div>
    </section>
  );
}

export default AdBanner;