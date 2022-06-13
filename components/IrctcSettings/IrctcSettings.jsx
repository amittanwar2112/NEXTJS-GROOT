import { pushTapEvent } from '@helpers/gaEvents';

const settings = [
  {key:'ForgotIRCTCPassword', serviceName: 'Forgot IRCTC Password ', className: 'trainRunningStatus', url: 'https://www.goibibo.com/trains/irctc-forgot-password/'},
  {key:'ForgotIRCTCId', serviceName: 'Forgot IRCTC ID', url: 'https://www.goibibo.com/trains/irctc-forgot-userid/'},
  {key:'CreateIRCTCId', serviceName: 'Create IRCTC ID  ', className: 'trainCoach', url: 'https://www.goibibo.com/trains/create-irctc-account/'},
];

const IrctcSettings = ({currentPage = '', currentPageGa = ''}) => {
  function openInNewTab(url, key) {
    pushTapEvent(`${currentPageGa}_${key}_click`)
    window.open(url, '_blank');
  }

  return (
    <section className="marginTB20">
      <h2 className="titleHeader titleHeaderh2">IRCTC Settings</h2>
      <div className="smallCardsWrap">
        {
          settings.map((setting,index) => {
            const { serviceName = '', url = '', key = '' } = setting;
            return (
              <aside key={index} className="smallCards padLR10 curPoint" onClick={() => {openInNewTab(url, key)}}>
		    				<div className="flex row alignCenter width90">
		    					<span className="padR5"><img src="https://gos3.ibcdn.com/irctclogo-1602059281.png" width="40px" height="40px" /></span>
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

export default IrctcSettings;