import { pushTapEvent } from '@helpers/gaEvents';
import styles from '../../styles/Home.module.css'

const services = [
  {key: 'home', serviceName: 'Book Train', className: styles.trainDetails, url: 'https://www.goibibo.com/trains/'},
  {key: 'pnr', serviceName: 'PNR Status', className: styles.checkPnr , url: 'https://www.goibibo.com/trains/check-pnr-status/'},
  {key: 'lts', serviceName: 'Live train status', className: styles.trainRunningStatus , url: 'https://www.goibibo.com/trains/check-train-running-status/'},
  {key: 'coach', serviceName: 'View train coach position ', className: styles.trainCoach , url: 'https://www.goibibo.com/trains/train-coach-position/'},
  {key: 'pl', serviceName: 'Platform Locator', src: 'https://gos3.ibcdn.com/PlatformLocator-1609134539.png', url: 'https://www.goibibo.com/trains/platform-locator', sprite: false}
];

const InformationServices = ({currentPage = '', currentPageGa = ''}) => {
  function openInNewTab(url, key) {
    pushTapEvent(`${currentPageGa}_${key}_click`)
    window.open(url, '_blank');
  }

  const comp = (src) => {
    return <img src={src} alt="PL"/>;
  }
  return (
    <section className="marginTB20">
      <h2 className={`${styles.titleHeader} ${styles.titleHeaderh2}`} >Train Information Services</h2>
      <div className={`${styles.smallCardsWrap}`} >
        {
          services.map((service,index) => {
            const { className = '', serviceName = '', url = '', key = '', sprite = true, src = '' } = service;
            if(currentPage === key) {
              return null;
            }
            return (
              <aside key={index} className={`${styles.smallCards} padLR10 curPoint`}  onClick={() => {openInNewTab(url)}}>
		    				<div className={`${styles.flex} ${styles.row} ${styles.alignCenter} width90`} >
		    					<span className={`${styles.padR10}`} >
                    {sprite ? (<span className={`${styles.trainsServicesSprite} + ${className} `} ></span>) : comp(src)}
                  </span>
                  <span className="fontQuick ico16 goBlue fb lh1-2">{serviceName}</span>
                  </div>
                  <i className={`${styles.iconarrowright} goBlue ico10`} ></i>
		    			</aside>
            )
          })
        }
      </div>
    </section>
  );
};

export default InformationServices;