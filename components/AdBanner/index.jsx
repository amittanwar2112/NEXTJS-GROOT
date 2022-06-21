import Image from 'next/image';
import OfferCarousel from './OfferCarousel1';
import styles from '../../styles/Home.module.css';
function AdBanner(props) {
  return (
    <section className={`${styles.homeAdBannerWrap}`}>
      <div className={`${styles.adBannerWrap}`}>
        <Image
          src="https://gos3.ibcdn.com/TrainsHomeBanner-1610443393.png"
          width={590}
          height={190}
          alt="banner"
        />
      </div>
      <div id="carousel"></div>
    </section>
  );
}

export default AdBanner;
