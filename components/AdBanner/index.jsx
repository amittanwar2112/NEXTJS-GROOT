import Image from 'next/image';
import OfferCarousel from './OfferCarousel1'
import styles from '../../styles/Home.module.css'
function AdBanner(props) {
  return (
    <section className={`${styles.homeAdBannerWrap}`} >
      <div className={`${styles.adBannerWrap}`} >
        <img src="https://gos3.ibcdn.com/TrainsHomeBanner-1610443393.png" 
          width="100%" 
          height="19rem"
          alt='banner' />
      </div>
      <div id="carousel"></div>
    </section>
  );
}

export default AdBanner;