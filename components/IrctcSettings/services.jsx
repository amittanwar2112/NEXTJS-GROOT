import { pushTapEvent } from '@helpers/gaEvents';

const services = [
  {key: 'home', serviceName: 'Book Train', className: 'trainDetails', url: 'https://www.goibibo.com/trains/'},
  {key: 'pnr', serviceName: 'PNR Status', className: 'checkPnr', url: 'https://www.goibibo.com/trains/check-pnr-status/'},
  {key: 'lts', serviceName: 'Live train status', className: 'trainRunningStatus', url: 'https://www.goibibo.com/trains/check-train-running-status/'},
  {key: 'coach', serviceName: 'View train coach position ', className: 'trainCoach', url: 'https://www.goibibo.com/trains/train-coach-position/'},
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
      <h2 className="titleHeader titleHeaderh2">Train Information Services</h2>
      <div className="smallCardsWrap">
        {
          services.map((service,index) => {
            const { className = '', serviceName = '', url = '', key = '', sprite = true, src = '' } = service;
            if(currentPage === key) {
              return null;
            }
            return (
              <aside key={index} className="smallCards padLR10 curPoint" onClick={() => {openInNewTab(url)}}>
		    				<div className="flex row alignCenter width90">
		    					<span className="padR10">
                    {sprite ? (<span className={"trainsServicesSprite "+ className}></span>) : comp(src)}
                  </span>
                  <span className="fontQuick ico16 goBlue fb lh1-2">{serviceName}</span>
                  </div>
                  <i className="icon-arrow-right goBlue ico10"></i>
		    			</aside>
            )
          })
        }
      </div>
    </section>
  );
};

export default InformationServices;