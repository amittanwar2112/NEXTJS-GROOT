export function customTemplatePlaceholder({type, text, subtext = ''}) {
  let templateString = '<div';
  if (type === 'detectNetworkOfflineDiv') {
    templateString += ' id="detectNetworkOfflineDiv" ';
  }
  templateString += 'style="z-index: 20;overflow-y: hidden;max-height: 100px;transition: all .2s cubic-bezier(0, 1, 1, 1);position: absolute;bottom: 15%;left: 5%;width: 90%;float: left;background: rgba(0,0,0,0.5);padding: .938em;-webkit-border-radius: 25px;font-weight: 500;font-style: normal;text-align: center;';
  if (type === 'detectNetworkOfflineDiv') {
    templateString += ' display: none ';
  }
  templateString += '">';
  templateString += '<span style="line-height: 1.7; font-size: .875rem; color: #fff; width: 100%; float: left;">';
  templateString += text;
  templateString += (subtext ? '<br />' + subtext : '');
  templateString += '</span></div>';
  return templateString;
}

export function detectNetworkOffline() {
  return `
    <script>
    function detectNetworkHandler(event) {
      console.log('fired');
      const detectNetworkOfflineDiv = document.querySelector('#detectNetworkOfflineDiv');
      if (navigator.onLine) {
        detectNetworkOfflineDiv.style.display = 'none';
      } else {
        if (!detectNetworkOfflineDiv) {
          const newDiv = document.createElement('div');
          newDiv.innerHTML = '${customTemplatePlaceholder({type: 'detectNetworkOfflineDiv', text: 'Oops! Seems like you went offline', subtext: 'This message will hide itself once you are back online'})}';
          document.querySelector('body').appendChild(newDiv);
          document.querySelector('#detectNetworkOfflineDiv').style.display = 'block';
        } else {
          document.querySelector('#detectNetworkOfflineDiv').style.display = 'block';
        }
      }
    }

    window.addEventListener('online', detectNetworkHandler);
    window.addEventListener('offline', detectNetworkHandler);
    </script>
  `;
}


export function pingScript(flavour) {
  return `
    <script type="text/javascript">
      var jsLoaded = false;
      var vendorLoaded = false;
      function pageSeen(urlTag, storageInfo) {
        try {
          var endPoint = "//dexter.goibibo.com/common/ping/";
          var url = endPoint;
          if (!storageInfo) {
            var loc = window.location.pathname;
            var timeStamp = (new Date() - starttime)/1000;
            var tag = urlTag || jsLoaded;
            url += "?jsLoaded=" + tag + "&pageseen=" + loc + "&timestamp=" + timeStamp + "&application=groot" + "&flavour=${flavour}" + "&docReferer=" + document.referrer + "&timelog=" + new Date().toISOString();
          } else {
            url = storageInfo.url + "?storagePercent=" + storageInfo.storagePercent + "&storageUsed=" + storageInfo.storageUsed + "&serviceApp=groot" + "&flavour=${flavour}" + "&timelog=" + new Date().toISOString();
          }
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("GET", url, true);
          xhr.send();
        } catch(err) {
          console.log(err);
        }
      }
      // track raw page views
      pageSeen();
      // storage logging
      window.addEventListener('load', () => {
        if (navigator.storage && navigator.storage.estimate) {
          navigator.storage.estimate().then((storage) => {
            var storagePercent = ((storage.usage / storage.quota) * 100).toPrecision(2);
            var storageUsed = Math.floor(storage.usage / (1024));
            pageSeen(false, {url: '//dexter.goibibo.com/common/newrelic/', storagePercent, storageUsed});
          });
        }
      });
    </script>
  `;
}

export function swRegisterScript() {
  return `
    <script type="text/javascript">
      function checkServiceWorker() {
        if(!('serviceWorker' in navigator) && !('PushManager' in window)){
          return false;
        }
        return true;
      }
      function registerWorker() {
        if (checkServiceWorker()) {
          navigator.serviceWorker.register('/go-worker.js');
        }
      }
      registerWorker();
    </script>
  `;
}

export function isMobileDevice(ua) {
  const useragent = ua.toLowerCase();
  const output = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    ua,
  )
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      useragent.substr(0, 4),
    );

  return !!output;
}

export function getAdScript(needAdTechScript, pageName) {
	if(!needAdTechScript) {
		return '';
	} else {
		return (`
				<script
					src="https://jsak.goibibo.com/adTech_v1.0/adScript/build/version-gi.min.js"
					type="application/javascript"
					async
				></script>
		`);
	}
}


export function getThankyouScript(response,reqQuery){
    const {transactionId =''}= reqQuery;
    const {passengers = [], order = {},train = {}} = response;
    const {total_amount = 0}= order;
    const {number = '', text = ''}=train;
    const thankYouData = {
      actionField: {
        id: transactionId,
        affiliation: "goibibo",	
        revenue: total_amount,
        tax: "",
        shipping: "",
        coupon: ""
      },
      products: [{
        name: text,
        id: Number(number),
        price: total_amount,
        brand: 'IRCTC',
        category: 'Train Ticket',
        variant: response.class || '',
        quantity: passengers.length,
        coupon: ''
      }]
    };
		return (`
        <script type="text/javascript">
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          "ecommerce": {
            "purchase": ${JSON.stringify(thankYouData)}
          },
          "event": "enhanced-ecommerce-thankyou"
        })
        </script>
		`);
}
