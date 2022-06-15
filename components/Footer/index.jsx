import FooterFrequentTrains from './FooterFrequentTrains';
import nextConfig from 'next/config'
const Footer = function({ needProductInfo = true, needFrequentTrains = true }) {
const footerData =   [];
const { publicRuntimeConfig, serverRuntimeConfig} = nextConfig()
console.log(process.env ,'FOOTER_DATA')
console.log(serverRuntimeConfig ,'FOOTER_DATA1')
//  const footerData = JSON.parse(nextConfig.footerContsant) || [];
  return (
    <div className="footerBox posRel">
      <div className="website-badge-Bottom">
        <a className="awsAward" href="https://yourstory.com/aws-mobility/" target="_blank" rel="noopener" aria-label="Read more about AWS award from yourstory">&nbsp;</a>
      </div>
      <div className="maxWidth960 marginAuto">
        {
          needProductInfo ?
          <div className="col-md-10 col-sm-12 padB20">
            <ul className="col-md-3 col-sm-3 col-xs-6 footerLinks marginB10">
              <li className="txtTransUpper font12 greyDr fb padB10">our products</li>
              <li><a href="/hotels/">Domestic Hotels</a></li>
              <li><a href="/hotels-international/">International Hotels</a></li>
              <li><a href="/flights/">Domestic Flights</a></li>
              <li><a href="/international-flights/">International Flights</a></li>
              <li><a href="/bus/">Bus Booking</a></li>
              <li><a href="/cars/">Cab Booking</a></li>
              <li><a href="/trains/">Train Ticket Booking</a></li>
              <li><a href="/routeplanner/">Route Planner</a></li>
              <li><a href="/destinations/">Destination Planner</a></li>
              <li><a href="https://advertising.goibibo.com/ad/solutions/">Goibibo Advertising Solutions</a></li>
            </ul>
            <ul className="col-md-3 col-sm-3 col-xs-6 footerLinks marginB10">
              <li className="txtTransUpper font12 greyDr fb padB10">Company</li>
              <li><a href="/aboutus/">About Us</a></li>
              <li><a href="/info/terms-of-services/">Terms of Services</a></li>
              <li><a href="/info/user-agreement/">User Agreement</a></li>
              <li><a href="/info/privacy/">Privacy</a></li>
              <li><a href="/mysupport/customerHelp/">Customer Support</a></li>
              <li><a href="/careers/" target="_blank" rel="noopener">Careers</a></li>
              <li><a href="/info/corporate-social-responsibility/">Corporate Social Responsibility</a></li>
              <li><a href="/mobile/">Goibibo on Mobile</a></li>
              <li><a href="https://www.youtube.com/user/goibibo">Goibibo TV Advertisement</a></li>
              <li><a href="https://tech.goibibo.com/" target="_blank" rel="noopener">Technology@Goibibo</a></li>
            </ul>
            <ul className="col-md-3 col-sm-3 col-xs-6 footerLinks marginB10">
              <li className="txtTransUpper font12 greyDr fb padB10">travel resources</li>
              <li><a href="/bus/bus-routes/">Popular Bus Routes</a></li>
              <li><a href="/cars/airport-cabs/">Airport Cabs</a></li>
              <li><a href="/hotels/india/">Hotels in India</a></li>
              <li><a href="/airlines/">Popular Airlines</a></li>
              <li><a href="/offers/">Goibibo Offers</a></li>
              <li><a href="/airports/">International Airports</a></li>
              <li><a href="/flights/city-to-city-airlines/">City Airline Routes</a></li>
              <li><a href="/destinations/intl/">International Travel Guide</a></li>
            </ul>
            <ul className="col-md-3 col-sm-3 col-xs-6 footerLinks marginB10">
              <li className="txtTransUpper font12 greyDr fb padB10">more links</li>
              <li><a href="/flights/cheap-flights/">Cheap Flights</a> </li>
              <li><a href="/trains/check-pnr-status/">PNR Status</a></li>
              <li><a href="/trains/check-train-running-status/">Live Train Status</a></li>
              <li><a href="/flight-schedule/">Flight Schedule</a></li>
              <li><a href="/gostays/">Go Stays</a></li>
              <li><a href="/bus/city-buses/">Popular Bus Cities</a></li>
              <li><a href="/airports/airports-in-india/">Airports in India</a></li>
              <li><a href="/hotels/chain/">Popular Hotel Chains</a></li>
              <li><a href="/info/hotels-near-me/">Hotels Near Me</a></li>
              <li><a href="/trains/home/covid-trains/">COVID Special Trains</a></li>
              <li><a href="/cars/covid-epass/">Epass Assistance</a></li>
              <li><a href="/trains/tatkal-railway-reservation/">Tatkal Ticket Booking</a></li>
              <li><a href="https://advertising.goibibo.com/ad/solutions/">Advertise with Us</a></li>
            </ul>
          </div> :
          null
        }
        {
          needFrequentTrains ?
            <div className={'col-md-12 col-sm-12 padTB20 fotDPLink ' + (needProductInfo ? 'borderTop' : '')}>
              <div className="width100 fl pDTB20 fotDPLink">
                <p className="fl width100">
                  {
                    footerData.map((footerItem) => {
                      return footerItem.links_data ? <FooterFrequentTrains footerItem={footerItem} /> : null;
                    })
                  }
                </p>
              </div>
            </div> :
            null
        }
        <div className="col-md-12 col-sm-12 col-xs-12 footerAppLinks">
          <div className="col-md-2 col-sm-3">
            <p className="ico14 fb">Follow Us</p>
            <div className="padT10">
            {/* <a target="_blank" rel="noopener" href="http://facebook.com/goibibo" className="fl padR10" title="Facebook">
                <i className="ico24 lh1-2 greyLt icon-facebook"></i>
              </a> */}
              <a target="_blank" rel="noopener" href="http://twitter.com/goibibo" className="fl padR10" title="Twitter">
                <i className="ico26 lh1-2  greyLt icon-twitter"></i>
              </a>
              <a target="_blank" rel="noopener" href="http://www.youtube.com/user/goibibo" className="fl padR10" title="youtube">
                <i className="ico28 greyLt icon-youtube"></i>
              </a>
              <a target="_blank" rel="noopener" href="https://plus.google.com/+goibibo/" className="fl" title="Google Plus" aria-label="Google plus goibibo">
                <span className="hd_vs fr_gplus margin0">&nbsp;</span>
              </a>
            </div>
          </div>
          <div className="col-md-5 col-sm-6 dib marginB10">
            <p className="ico14 fb">Book Tickets faster. Download our mobile Apps</p>
            <div className="padT10">
              <a target="_blank" rel="noopener" className="fthm-mobApp fthm-goog fl marginR5" href="http://app.appsflyer.com/com.goibibo?pid=mobile_site&amp;c=m_header" aria-label="Download goibibo on android"></a>
              <a target="_blank" rel="noopener" className="fthm-mobApp fthm-app fl marginR5" href="https://itunes.apple.com/in/app/goibibo-flight-bus-hotel-booking/id631927169?mt=8" aria-label="Download goibibo on iphone"></a>
              <a target="_blank" rel="noopener" className="fthm-mobApp fthm-windows fl" href="http://www.windowsphone.com/en-in/store/app/goibibo/6f16a6ec-3b7e-4782-9f74-57f75a4cc1a3" aria-label="Download goibibo on windows"></a>
            </div>
          </div>
          <div className="col-md-5 col-sm-3 marginT5 pad0">
            <span className="commonSprite fl verifySign marginR10">&nbsp;</span>
            <span className="commonSprite fl americanExp marginT5 marginR10 ipaddn">&nbsp;</span>
            <span className="commonSprite fl masterCard marginT5 marginR10 ipaddn">&nbsp;</span>
            <span className="commonSprite fl visaCard marginT5 marginR10 ipaddn">&nbsp;</span>
            <span className="commonSprite payu marginT5 marginR10">&nbsp;</span>
            <span className="commonSprite rupay marginT2 marginR10 ipaddn">&nbsp;</span>
            <span className="commonSprite iata marginR10">&nbsp;</span>
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12 footerCopyrights">
          <div className="col-md-8">
            <a className="commonSprite mmt" target="_blank" rel="noopener" href="http://www.makemytrip.com/" aria-label="visit makemytrip"></a>
            <span className="commonSprite backslash" href="#"></span>
            <a rel="nofollow" className="commonSprite redBus" target="_blank" rel="noopener" href="http://www.redbus.in/" aria-label="visit redbus"></a>
            <a rel="nofollow" className="commonSprite ads" target="_blank" rel="noopener" href="http://www.ibiboads.com/" aria-label="visit ibibo loads"></a>
          </div>
          <div className="fr padT10">© 2022 ibibogroup All rights reserved</div>
        </div>
      </div>
    </div>
  );
}
export default Footer;