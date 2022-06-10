import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { getFooter } from '@services/headerfooter';
import FooterFrequentTrains from './FooterFrequentTrains';


export default function Footer({ needProductInfo = true, needFrequentTrains = true }) {
  const { data, isLoading, error } = useQuery('getFooter', getFooter, {
    staleTime: Infinity
  });

  if (isLoading) return 'Loading...'
  if (error) return 'Something went wrong'

  const footerData = data;
  
  return(
       <footer className="pageFtrCntDweb">
            <div className="footerSection">
                <div className="pageFtrCnt__gridDweb">
                    <div className="pageFtrCnt__gridCol">
                        <p className="font16 lineHight22 blackText">Our Products</p>
                        <ul className="pageFtrCnt__lstCnt">
                        <li className="font14 lineHight18 blueText2"><a href="/hotels/"> Domestic Hotels</a></li>
                        <li className="font14 lineHight18 blueText2 appendTop14"><a href="/hotels-international/">International Hotels</a></li>
                        <li className="font14 lineHight18 blueText2 appendTop14"><a href="/flights/">Domestic Flights</a></li>
                        <li className="font14 lineHight18 blueText2 appendTop14"><a href="/international-flights/">International Flights</a></li>
                        <li className="font14 lineHight18 blueText2 appendTop14"><a href="/bus/">Bus Booking</a></li>
                        <li className="font14 lineHight18 blueText2 appendTop14"><a href="/cars/">Cab Booking</a></li>
                        
                        <li className="font14 lineHight18 blueText2 appendTop14"><a href="/routeplanner/">Route Planner</a></li>
                        <li className="font14 lineHight18 blueText2 appendTop14"><a href="/destinations/">Destination Planner</a></li>
                        <li className="font14 lineHight18 blueText2 appendTop14"><a href="https://advertising.goibibo.com/ad/solutions/">Goibibo Advertising Solutions</a></li>
                        </ul>
                    </div>
                    <div className="pageFtrCnt__gridCol">
                        <p className="font16 lineHight22 blackText">Company</p>
                        <ul className="pageFtrCnt__lstCnt">
              <li><a href="/aboutus/">About Us</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="/info/terms-of-services/">Terms of Services</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="/info/user-agreement/">User Agreement</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="/info/privacy/">Privacy</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="/mysupport/customerHelp/">Customer Support</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="/careers/" target="_blank" rel="noopener">Careers</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="/info/corporate-social-responsibility/">Corporate Social Responsibility</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="/mobile/">Goibibo on Mobile</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="https://www.youtube.com/user/goibibo">Goibibo TV Advertisement</a></li>
              <li className="font14 lineHight18 blueText2 appendTop14"><a href="https://tech.goibibo.com/" target="_blank" rel="noopener noreferrer">Technology@Goibibo</a></li>
                        </ul>
                    </div>
                    <div className="pageFtrCnt__gridCol">
                        <p className="font16 lineHight22 blackText">Travel Resources</p>
                        <ul className="pageFtrCnt__lstCnt">
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/bus/bus-routes/">Popular Bus Routes</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/cars/airport-cabs/">Airport Cabs</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/hotels/india/">Hotels in India</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/airlines/">Popular Airlines</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/offers/">Goibibo Offers</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/airports/">International Airports</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/flights/city-to-city-airlines/">City Airline Routes</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/destinations/intl/">International Travel Guide</a></li>
                        </ul>
                    </div>
                    <div className="pageFtrCnt__gridCol">
                        <p className="font16 lineHight22 blackText">More Links</p>
                        <ul className="pageFtrCnt__lstCnt">
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/flights/cheap-flights/">Cheap Flights</a> </li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/trains/check-pnr-status/">PNR Status</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/trains/check-train-running-status/">Live Train Status</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/flight-schedule/">Flight Schedule</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/gostays/">Go Stays</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/bus/city-buses/">Popular Bus Cities</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/airports/airports-in-india/">Airports in India</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/hotels/chain/">Popular Hotel Chains</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/info/hotels-near-me/">Hotels Near Me</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/trains/home/covid-trains/">COVID Special Trains</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/cars/covid-epass/">Epass Assistance</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="/trains/tatkal-railway-reservation/">Tatkal Ticket Booking</a></li>
                    <li className="font14 lineHight18 blueText2 appendTop14"><a href="https://advertising.goibibo.com/ad/solutions/">Advertise with Us</a></li>
                        </ul>
                    </div>
                
                
                    {/* <div className="pageFtrCnt__gridCol">
                        <p className="font16 lineHight22 blackText">Useful Links</p>
                        <ul className="pageFtrCnt__lstCnt">
                            <li className="font14 lineHight18 blueText2"><a href="#">Book a train from Goibibo</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">What does a PNR mean?</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">What are the price concessions in IRCTC?</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">How to create an IRCTC ID?</a></li>
                        </ul>
                    </div>
                    <div className="pageFtrCnt__gridCol">
                        <p className="font16 lineHight22 blackText">Other IRCTC Links</p>
                        <ul className="pageFtrCnt__lstCnt">
                            <li className="font14 lineHight18 blueText2"><a href="#">Create IRCTC ID</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">Change/forgot IRCTC password</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">Forgot IRCTC ID</a></li>
                            <li className="font14 lineHight18 blueText2 appendTop4"><a href="#">IRCTC ID account settings</a></li>
                        </ul>
                        </div> */}
                </div>
                {
                needFrequentTrains ?
                 <div className='pageFtrCnt__gridSection'>
                        {
                            footerData.map((footerItem, index) => {
                            return footerItem.links_data ? <FooterFrequentTrains key={index} footerItem={footerItem} /> : null;
                            })
                        }
                 </div> :
                    null
                }
                <div className="makeFlex">
                <div className="pageFtrCnt__flwUsCnt appendRight30">
                    <p className="font14 lineHight18 blackText">Follow Us</p>
                    <div className="makeFlex hrtlCenter paddingLR16 appendTop10">
                        <div className="pageFtrCnt__flwSmIcnDweb">
                            <a target="_blank" rel="noopener noreferrer" href="http://facebook.com/goibibo" className="fl padR10" title="Facebook">
                            <span className="sprite fbIcon"></span>
                            </a>
                            <p className="font12">Facebook</p>
                        </div>
                        <div className="pageFtrCnt__flwSmIcnDweb appendLeft50">
                            <a target="_blank" rel="noopener noreferrer" href="http://twitter.com/goibibo" className="fl padR10" title="Twitter">
                            <span className="sprite twitrIcon"></span>
                            </a>
                            <p className="font12">Twitter</p>
                        </div>
                    </div>
                </div>
                <div className="pageFtrCnt__appDwnldDweb">
                    <p className="font14 lineHight18 blackText appendBottom12">Download our App</p>
                    <div className="makeFlex"> 
                        <div className="appendRight80">
                            <a href='http://app.appsflyer.com/com.goibibo?pid=mobile_site&amp;c=m_header'>
                                {/* <img src="https://gos3.ibcdn.com/googlePlay-1649319067.png" alt="playstore icon" className="playStrIcn" /> */}
                                <span className="spriteNew playStoreLogo"></span>
                            </a>
                            {/* <a href={'#'}><span className="sprite playStoreLogo"></span></a> */}
                            <p className="roboto font12 lineHight14 grayText4 appendTop8">Rated <span className="boldFont">4.4</span></p>
                            <p className="roboto font12 lineHight14 grayText4"> <span className="boldFont">8.5+ Lakh reviews</span></p>
                            <p className="roboto font12 lineHight14 grayText4"> <span className="boldFont">5 Crore+ </span> downloads</p>
                        
                        </div>
                        <div className="appendRight90">
                             <a   href='https://itunes.apple.com/in/app/goibibo-flight-bus-hotel-booking/id631927169?mt=8'>
                                {/* <img src="https://gos3.ibcdn.com/appStore-1649319017.png" alt="app store icon" className="appStrIcn" /> */}
                                <span className="spriteNew appStoreLogo"></span>
                            </a>
                           
                            <p className="roboto font12 lineHight14 grayText4 appendTop8">Rated <span className="boldFont">4.4</span></p>
                            <p className="roboto font12 lineHight14 grayText4"> <span className="boldFont">8.5+ Lakh reviews</span></p>
                        </div>
                    </div>
                </div>
                <div className="paddingL14">
                    <p className="font14 lineHight18 blackText">Easy payment options</p>
                    <div className='makeFlex hrtlCenter appendTop24'>
                       <span className="spriteNew payment1" />
                       <span className="spriteNew payment2" />
                       <span className="spriteNew payment3" />
                       <span className="spriteNew payment4" />
                       <span className="spriteNew payment5" />
                       <span className="spriteNew payment6" />
                       <span className="spriteNew payment7" />
                        {/* <img src="https://gos3.ibcdn.com/payIcon2-1649318988.png" alt="payment1 image" className="paymentIcn1"/>
                        <img src="https://gos3.ibcdn.com/payIcon1-1649318956.png" alt="payment2 image" className="paymentIcn2"/> */}
                     
                    </div>
                </div>
            </div>
            </div>
            <div className="pageFtrCnt__othrBrndDweb">
                <div className="containerSection makeFlex spaceBetween">
                    <div className="flexOne makeFlex">
                        <p className="font14 lineHight18 blackText width120 marginRight75">Our other affiliated brands</p>
                        <div className="makeFlex">
                            <a target="_blank" rel="noopener noreferrer" href="http://www.makemytrip.com/" aria-label="visit makemytrip"><span className="spriteNew mmtLogo"></span></a>
                            <a target="_blank" rel="noopener noreferrer" href="http://www.redbus.in/" aria-label="visit redbus"><span className="spriteNew redBusLogo"></span></a>
                             {/* <img src='https://gos3.ibcdn.com/mmtLogo-1649318885.png' alt="mmt image" className="mmtLogoIcn"/>
                            <img src="https://gos3.ibcdn.com/redBusLogo-1649318930.png" alt="redbus image" className="redbusLogoIcn"/> */}
                           
                        </div>
                    </div>
                    <p className="font14 lineHight18 blackText textCenter ">© 2022 ibibogroup All rights reserved</p>
                </div>
                </div>
        </footer>
    );
    
}
