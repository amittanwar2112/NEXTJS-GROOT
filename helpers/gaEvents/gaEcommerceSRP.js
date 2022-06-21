import logEcommerceEvent from './logEcommerceEvent';
import { getCurrentState as mwebCurrentState } from '../../containers/SRP/SRPContextProvider';
import { getCurrentState as dwebCurrentState } from '../../containers/DSRP/DSRPContextProvider';

export const IMPRESSION = 'IMPRESSION';
export const PRODUCT_CLICK = 'PRODUCT_CLICK';

function logImpressionEcommerce(url, getCurrentState) {
  const { avlResults } = getCurrentState();
  const impressionsList = (avlResults || []).map((item, index) => {
    const { available_seats, train } = item || {};
    const { name = '', number = '' } = train || {};
    return {
      name,
      id: parseInt(number) || -1,
      position: index + 1,
      price: available_seats && available_seats.price ? parseInt(available_seats.price) : '',
      category: 'trains',
      list: 'search_results'
    };
  });
  const data = {
    ecommerce: {
      impressions: impressionsList
    },
    event: 'enhanced-ecommerce-srp'
  };
  return data;
}

function logProductClickEcommerce(url, getCurrentState) {
  const searchparams = new URLSearchParams(url.split('?')[1]);
  const query = searchparams.get('query');
  if (!query) {
    return null;
  }
  const [trainNo, travelClass, quotaSelected] = query.split('-').slice(3);
  const { avlResults } = getCurrentState();
  let selectedTrain = null;
  (avlResults || []).forEach((item, index) => {
    if (!selectedTrain && item.train && item.train.number === trainNo) {
      const [travelClassSelected] = item.classes.filter((travelClassItem) => {
        const { key = '', quota = {} } = travelClassItem;
        return key === travelClass && quota && quota.qt === quotaSelected;
      });
      const { price = '', availability_status = '', quota } = travelClassSelected || {};
      selectedTrain = {
        id: parseInt(trainNo) || -1,
        position: index + 1,
        name: item.train.name,
        price: price ? parseInt(price) : '',
        travelClass: travelClass || '',
        quota: quota ? quota.qt : '',
        avl: availability_status,
        category: 'trains',
        list: 'search_results'
      };
    }
  });
  if (!selectedTrain) {
    return null;
  }
  return {
    event: 'productClick',
    ecommerce: {
      click: {
        actionField: {
          action: 'click',
          list: 'search_results'
        },
        products: [selectedTrain]
      }
    }
  };
}

export function logEcommerceDataInSRP(type, data, isMobile = true) {
  try {
    let logSpecificData = {};
    const getCurrentState = isMobile ? mwebCurrentState : dwebCurrentState;
    switch (type) {
      case IMPRESSION:
        logSpecificData = logImpressionEcommerce(data, getCurrentState);
        break;
      case PRODUCT_CLICK:
        logSpecificData = logProductClickEcommerce(data, getCurrentState);
        break;
    }
    const commonData = {
      path: window.location.pathname
    };
    const eCommerceData = { ...commonData, ...logSpecificData };
    logEcommerceEvent(eCommerceData);
  } catch (err) {
    console.log('Logging eCommerce event failed', err);
  }
}
