import { logEvent } from '../gaEvents';

export function initiateConfig(pageName) {
  var initialConfig = {
    userCallbackForView: function (id) {
      logEvent({
        event: 'ElementShown',
        eventCategory: 'ElementShown',
        eventAction: 'AdBanner',
        eventLabel: pageName
      });
    },
    userClickHandlerForClick: function () {
      logEvent({
        event: 'trainTapped',
        trainTapType: pageName,
        trainTapValue: 'AdBanner'
      });
    },
    onError: function () {
      let $adPlaceHolder = document.querySelector('#AdPlaceholder');
      if ($adPlaceHolder) {
        $adPlaceHolder.style.display = 'none';
      }
      logEvent({
        event: 'adbanner_error',
        eventCategory: 'adbanner_error',
        eventAction: pageName
      });
    },
    ORG: 'gi',
    AUTH_COOKIE_KEY: 'OAUTH-GOIBIBO'
  };
  if (window.AdMMTSDK) {
    window.AdMMTSDK.init(initialConfig);
  } else {
    window.AdMMTSDK = [];
    window.AdMMTSDK.push(initialConfig);
  }
}
