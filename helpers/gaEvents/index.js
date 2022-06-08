
export function pushToGa(event, data) {
  try {
    if (typeof(window) !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event,
        data
      });
    }
  } catch(err) {
    console.log('Unable to log GA event', err);
  }
}

export function pushTapEvent(trainTapType = '', trainTapValue = '', eventLabel = '', eventAction = '') {
  const event = 'trainTapped';
  try {
    if (typeof(window) !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event, trainTapType, trainTapValue, eventLabel, eventAction
      });
    }
  } catch(err) {
    console.log('Unable to log Tap event to GA', err);
  }
}

export function logEvent({event, eventAction, eventLabel}) {
  try {
    if (typeof(window) !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event, eventCategory: event, eventAction, eventLabel
      });
    }
  } catch(err) {
    console.log('Unable to log Tap event to GA', err);
  }
}