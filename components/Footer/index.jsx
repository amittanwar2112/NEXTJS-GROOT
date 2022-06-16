
import FooterFrequentTrains from './FooterFrequentTrains';
import {FOOTER_DATA} from '../../services/config'
import styles from '../../styles/Footer.module.css'

const Footer = function({ needProductInfo = true, needFrequentTrains = true }) {
  // console.log(FOOTER_DATA,'FOOTER_DATA')
  const footerData = FOOTER_DATA || [];
  return(
       <footer className={`${styles.pageFtrCntDweb}`} >
            <div className={`${styles.footerSection}`} >
                <div className={`${styles.pageFtrCnt__gridDweb}`} >
                    <div  className={`${styles.pageFtrCnt__gridCol}`} >
                        <p className={`${styles.font16} ${styles.lineHight22} ${styles.blackText}`} >Our Products</p>
                        <ul className={`${styles.pageFtrCnt__lstCnt}`} >
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2}`} ><a href="https://www.goibibo.com/hotels/"> Domestic Hotels</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`} ><a href="https://www.goibibo.com/hotels-international/">International Hotels</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/flights/">Domestic Flights</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/international-flights/">International Flights</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/bus/">Bus Booking</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/cars/">Cab Booking</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/trains/">Train Ticket Booking</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/routeplanner/">Route Planner</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/destinations/">Destination Planner</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://advertising.goibibo.com/ad/solutions/">Goibibo Advertising Solutions</a></li>
                        </ul>
                    </div>
                    <div className={`${styles.pageFtrCnt__gridCol}`}>
                        <p className={`${styles.font16} ${styles.lineHight22} ${styles.blackText}`}>Company</p>
                        <ul className={`${styles.pageFtrCnt__lstCnt}`}>
                        <li><a href="/aboutus/">About Us</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/info/terms-of-services/">Terms of Services</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/info/user-agreement/">User Agreement</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/info/privacy/">Privacy</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/mysupport/customerHelp/">Customer Support</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/careers/" target="_blank" rel="noopener">Careers</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/info/corporate-social-responsibility/">Corporate Social Responsibility</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/mobile/">Goibibo on Mobile</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.youtube.com/user/goibibo">Goibibo TV Advertisement</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://tech.goibibo.com/" target="_blank" rel="noopener">Technology@Goibibo</a></li>
                        </ul>
                    </div>
                    <div className={`${styles.pageFtrCnt__gridCol}`}>
                        <p className={`${styles.font16} ${styles.lineHight22} ${styles.blackText}`}>Travel Resources</p>
                        <ul className={`${styles.pageFtrCnt__lstCnt}`}>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/bus/bus-routes/">Popular Bus Routes</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/cars/airport-cabs/">Airport Cabs</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/hotels/india/">Hotels in India</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/airlines/">Popular Airlines</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/offers/">Goibibo Offers</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/airports/">International Airports</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/flights/city-to-city-airlines/">City Airline Routes</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/destinations/intl/">International Travel Guide</a></li>
                        </ul>
                    </div>
                    <div className={`${styles.pageFtrCnt__gridCol}`}>
                        <p className={`${styles.font16} ${styles.lineHight22} ${styles.blackText}`}>More Links</p>
                        <ul className={`${styles.pageFtrCnt__lstCnt}`}>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/flights/cheap-flights/">Cheap Flights</a> </li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/trains/check-pnr-status/">PNR Status</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/trains/check-train-running-status/">Live Train Status</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/flight-schedule/">Flight Schedule</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/gostays/">Go Stays</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/bus/city-buses/">Popular Bus Cities</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/airports/airports-in-india/">Airports in India</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/hotels/chain/">Popular Hotel Chains</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/info/hotels-near-me/">Hotels Near Me</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/trains/home/covid-trains/">COVID Special Trains</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/cars/covid-epass/">Epass Assistance</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://www.goibibo.com/trains/tatkal-railway-reservation/">Tatkal Ticket Booking</a></li>
                        <li className={`${styles.font14} ${styles.lineHight18} ${styles.blueText2} ${styles.appendTop14}`}><a href="https://advertising.goibibo.com/ad/solutions/">Advertise with Us</a></li>
                            </ul>
                    </div>
                
                
                    {/* <div className={`${styles.pageFtrCnt__gridCol}`}>
                        <p className={`${styles.font16} ${styles.lineHight22} ${styles.blackText}`}>Useful Links</p>
                        <ul className={`${styles.pageFtrCnt__lstCnt}`}>
                            <li className="font14 lineHight18 blueText2"><a href="#">Book a train from Goibibo</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">What does a PNR mean?</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">What are the price concessions in IRCTC?</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">How to create an IRCTC ID?</a></li>
                        </ul>
                    </div>
                    <div className={`${styles.pageFtrCnt__gridCol}`}>
                        <p className={`${styles.font16} ${styles.lineHight22} ${styles.blackText}`}>Other IRCTC Links</p>
                        <ul className={`${styles.pageFtrCnt__lstCnt}`}>
                            <li className="font14 lineHight18 blueText2"><a href="#">Create IRCTC ID</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">Change/forgot IRCTC password</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">Forgot IRCTC ID</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">IRCTC ID account settings</a></li>
                        </ul>
                        </div> */}
                </div>
                {
                needFrequentTrains ?
                 <div className={`${styles.pageFtrCnt__gridSection}`} >
                        {
                            footerData.map((footerItem,index) => {
                            return footerItem.links_data ? <FooterFrequentTrains key={index} footerItem={footerItem} /> : null;
                            })
                        }
                 </div> :
                    null
                }
                <div className={`${styles.makeFlex}`} >
                <div className={`${styles.pageFtrCnt__flwUsCnt} ${styles.appendRight30}`} >
                    <p  className={`${styles.font14} ${styles.lineHight18} ${styles.blackText}`} >Follow Us</p>
                    <div className={`${styles.makeFlex} ${styles.hrtlCenter} ${styles.paddingLR16} ${styles.appendTop10}`} >
                        <div className={`${styles.pageFtrCnt__flwSmIcnDweb}`} >
                            <a target="_blank" rel="noopener" href="http://facebook.com/goibibo" className="fl padR10" title="Facebook">
                            <span className={`${styles.sprite} ${styles.fbIcon}`} ></span>
                            </a>
                            <p className={`${styles.font12}`} >Facebook</p>
                        </div>
                        <div className={`${styles.pageFtrCnt__flwSmIcnDweb} ${styles.appendLeft50}`} >
                            <a target="_blank" rel="noopener" href="http://twitter.com/goibibo" className="fl padR10" title="Twitter">
                            <span className={`${styles.sprite} ${styles.twitrIcon}`}></span>
                            </a>
                            <p className={`${styles.font12}`} >Twitter</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.pageFtrCnt__appDwnldDweb}`} >
                    <p className={`${styles.font14} ${styles.lineHight18} ${styles.blackText} ${styles.appendBottom12}`} >Download our App</p>
                    <div className={`${styles.makeFlex}`} > 
                        <div className={`${styles.appendRight80}`} >
                            <a href='http://app.appsflyer.com/com.goibibo?pid=mobile_site&amp;c=m_header'>
                                {/* <img src="https://gos3.ibcdn.com/googlePlay-1649319067.png" alt="playstore icon" className="playStrIcn" /> */}
                                <span className={`${styles.spriteNew} ${styles.playStoreLogo}`} ></span>
                            </a>
                            {/* <a href={'#'}><span className="sprite playStoreLogo"></span></a> */}
                            <p className={`${styles.roboto} ${styles.font12} ${styles.lineHight14} ${styles.grayText4} ${styles.appendTop8}`}>Rated <span className={`${styles.boldFont}`}>4.4</span></p>
                            <p className={`${styles.roboto} ${styles.font12} ${styles.lineHight14} ${styles.grayText4}`}> <span className={`${styles.boldFont}`}>8.5+ Lakh reviews</span></p>
                            <p className={`${styles.roboto} ${styles.font12} ${styles.lineHight14} ${styles.grayText4}`}> <span className={`${styles.boldFont}`}>5 Crore+ </span> downloads</p>
                        
                        </div>
                        <div className={`${styles.appendRight90}`}>
                             <a   href='https://itunes.apple.com/in/app/goibibo-flight-bus-hotel-booking/id631927169?mt=8'>
                                {/* <img src="https://gos3.ibcdn.com/appStore-1649319017.png" alt="app store icon" className="appStrIcn" /> */}
                                <span className={`${styles.spriteNew} ${styles.appStoreLogo}`}></span>
                            </a>
                           
                            <p className={`${styles.roboto} ${styles.font12} ${styles.lineHight14} ${styles.grayText4} ${styles.appendTop8}`} >Rated <span className={`${styles.boldFont}`}>4.4</span></p>
                            <p className={`${styles.roboto} ${styles.font12} ${styles.lineHight14} ${styles.grayText4}`}> <span className={`${styles.boldFont}`}>8.5+ Lakh reviews</span></p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.paddingL14}`} >
                    <p className={`${styles.font14} ${styles.lineHight18} ${styles.blackText}`}>Easy payment options</p>
                    <div className={`${styles.makeFlex} ${styles.hrtlCenter} ${styles.appendTop24}`}>
                       <span className={`${styles.spriteNew} ${styles.payment1}`}  />
                       <span className={`${styles.spriteNew} ${styles.payment2}`}  />
                       <span className={`${styles.spriteNew} ${styles.payment3}`}  />
                       <span className={`${styles.spriteNew} ${styles.payment4}`}  />
                       <span className={`${styles.spriteNew} ${styles.payment5}`}  />
                       <span className={`${styles.spriteNew} ${styles.payment6}`}  />
                       <span className={`${styles.spriteNew} ${styles.payment7}`}  />
                        {/* <img src="https://gos3.ibcdn.com/payIcon2-1649318988.png" alt="payment1 image" className="paymentIcn1"/>
                        <img src="https://gos3.ibcdn.com/payIcon1-1649318956.png" alt="payment2 image" className="paymentIcn2"/> */}
                     
                    </div>
                </div>
            </div>
            </div>
            <div className={`${styles.pageFtrCnt__othrBrndDweb}`} >
                <div className={`${styles.containerSection} ${styles.makeFlex} ${styles.spaceBetween}`}>
                    <div className={`${styles.flexOne} ${styles.makeFlex}`} >
                        <p className={`${styles.font14} ${styles.lineHight18} ${styles.blackText} ${styles.width120} ${styles.marginRight75}`} >Our other affiliated brands</p>
                        <div className={`${styles.makeFlex}`} >
                            <a target="_blank" rel="noopener" href="http://www.makemytrip.com/" aria-label="visit makemytrip"><span className={`${styles.spriteNew} ${styles.mmtLogo}`}></span></a>
                            <a rel="nofollow" target="_blank" rel="noopener" href="http://www.redbus.in/" aria-label="visit redbus"><span className={`${styles.spriteNew} ${styles.redBusLogo}`}></span></a>
                             {/* <img src='https://gos3.ibcdn.com/mmtLogo-1649318885.png' alt="mmt image" className="mmtLogoIcn"/>
                            <img src="https://gos3.ibcdn.com/redBusLogo-1649318930.png" alt="redbus image" className="redbusLogoIcn"/> */}
                           
                        </div>
                    </div>
                    <p className={`${styles.font14} ${styles.lineHight18} ${styles.blackText} ${styles.textCenter} `} >© 2022 ibibogroup All rights reserved</p>
                </div>
                </div>
        </footer>
    );
    
}
export default Footer;
