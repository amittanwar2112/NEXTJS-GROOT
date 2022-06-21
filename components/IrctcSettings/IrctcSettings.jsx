import Image from 'next/image';
import { pushTapEvent } from '@helpers/gaEvents';
import styles from '../../styles/Home.module.css';

const settings = [
  {
    key: 'ForgotIRCTCPassword',
    serviceName: 'Forgot IRCTC Password ',
    className: styles.trainRunningStatus,
    url: 'https://www.goibibo.com/trains/irctc-forgot-password/'
  },
  {
    key: 'ForgotIRCTCId',
    serviceName: 'Forgot IRCTC ID',
    url: 'https://www.goibibo.com/trains/irctc-forgot-userid/'
  },
  {
    key: 'CreateIRCTCId',
    serviceName: 'Create IRCTC ID  ',
    className: styles.trainCoach,
    url: 'https://www.goibibo.com/trains/create-irctc-account/'
  }
];

const IrctcSettings = ({ currentPage = '', currentPageGa = '' }) => {
  function openInNewTab(url, key) {
    pushTapEvent(`${currentPageGa}_${key}_click`);
    window.open(url, '_blank');
  }

  return (
    <section className="marginTB20">
      <h2 className={`${styles.titleHeader} ${styles.titleHeaderh2}`}>IRCTC Settings</h2>
      <div className={`${styles.smallCardsWrap}`}>
        {settings.map((setting, index) => {
          const { serviceName = '', url = '', key = '' } = setting;
          return (
            <aside
              key={index}
              className={`${styles.smallCards} padLR10 curPoint`}
              onClick={() => {
                openInNewTab(url, key);
              }}>
              <div className={`${styles.flex} ${styles.row} ${styles.alignCenter} width90`}>
                <span className="padR5">
                  <Image
                    src="https://gos3.ibcdn.com/irctclogo-1602059281.png"
                    width="40px"
                    height="40px"
                    alt=''
                  />
                </span>
                <span className="fontQuick ico16 goBlue fb lh1-2">{serviceName}</span>
              </div>
              <i className={`${styles.iconarrowright} goBlue ico10`}></i>
            </aside>
          );
        })}
      </div>
    </section>
  );
};

export default IrctcSettings;
