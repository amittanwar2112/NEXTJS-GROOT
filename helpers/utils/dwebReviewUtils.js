export function parseUrlIntoTrainsParams(urlQuery, track = '') {
  if (urlQuery && typeof urlQuery === 'string') {
    const [srcCode, destCode, doj, trainNo, travelClass, quota] = urlQuery.split('-');
    return { srcCode, destCode, doj, trainNo, travelClass, quota, in_source: track };
  }
}

export function parseParamsToUrl(data) {
  const {
    source = {},
    destination = {},
    departure_date = {},
    train = {},
    availability = {}
  } = data || {};
  const { quota = {}, class: travelClass = '' } = availability;
  const { key: quotaKey = '' } = quota;
  const doj = getDojFromDate(departure_date);
  return `${source.code}-${destination.code}-${doj}-${train.number}-${travelClass}-${quotaKey}`;
}

function swapArray(arr, index1, index2) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  return arr;
}

function getDojFromDate(departure_date) {
  const dojArr = departure_date && departure_date.date ? departure_date.date.split('-') : [];
  const doj = swapArray(dojArr, 0, 2).join('');
  return doj;
}

export function getTrainsParams(store) {
  const {
    source = {},
    destination = {},
    departure_date = {},
    train = {},
    class: travelClassObj = {},
    availability = {}
  } = store;
  const { quota: quotaObj = {} } = availability || {};
  const srcCode = source.code;
  const destCode = destination.code;
  const trainNo = train.number;
  const travelClass = travelClassObj.key;
  const quota = quotaObj.key;
  const doj = getDojFromDate(departure_date);
  return { srcCode, destCode, doj, trainNo, travelClass, quota };
}

export function getStoreContentFromQuery(query) {
  const opObj = {};
  if (query.username) {
    opObj.irctc_user_name = query.username;
  }
  if (query.t) {
    opObj.t = query.t;
  }
  return opObj;
}

export function isElementFullyInViewPort($elt) {
  var bounding = $elt.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function debounce(cb, timeout) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, timeout);
  };
}

// export function scrollEltIntoView($elt) {
//   if (!isElementFullyInViewPort($elt)) {
//     const { top } = $elt.getBoundingClientRect();
//     // $elt.scrollTo(0, top + document.documentElement.getClientRects()[0].bottom);
//     return true;
//   }
//   return false;
// }

export function addToObjIfKeyExist(keysList) {
  const obj = {};
  Object.keys(keysList).forEach((item) => {
    if (keysList[item]) {
      obj[item] = keysList[item];
    }
  });
  return obj;
}

export function updateLocalStorage(reviewParams) {
  const oldReviewData = localStorage.trains_review ? JSON.parse(localStorage.trains_review) : {};
  const updatedReviewData = Object.assign({}, oldReviewData, reviewParams);
  localStorage.trains_review = JSON.stringify(updatedReviewData);
}

export function deleteTravllersData(reviewParams) {
  const oldReviewData = localStorage.trains_review ? JSON.parse(localStorage.trains_review) : {};
  // const updatedReviewData = Object.assign({}, oldReviewData, reviewParams);
  oldReviewData.allPassengers = reviewParams.allPassengers;
  oldReviewData.selectedPassengersIndices = reviewParams.selectedPassengersIndices;
  localStorage.setItem('trains_review', JSON.stringify(oldReviewData));
}

export function saveIrctcIds(data) {
  const oldReviewData = localStorage.trains_review ? JSON.parse(localStorage.trains_review) : {};
  // const updatedReviewData = Object.assign({}, oldReviewData, reviewParams);
  oldReviewData['irctcIds'] = data;
  localStorage.setItem('trains_review', JSON.stringify(oldReviewData));
}

function getConvertedObjects(storeVal) {
  const currentStoreVal = JSON.parse(storeVal);
  let cachedReviewDetails = {};
  if (localStorage.trains_review) {
    cachedReviewDetails = JSON.parse(localStorage.trains_review);
  }
  return { currentStoreVal, cachedReviewDetails };
}

export function availLocalCache(storeVal) {
  const { currentStoreVal, cachedReviewDetails } = getConvertedObjects(storeVal);
  function updateCurrentStoreContent(key) {
    currentStoreVal[key] = currentStoreVal[key] || cachedReviewDetails[key] || '';
    cachedReviewDetails[key] = currentStoreVal[key]
      ? currentStoreVal[key]
      : cachedReviewDetails[key] || '';
  }
  updateCurrentStoreContent('irctc_user_name');
  updateCurrentStoreContent('user_ticket_phone_number');
  updateCurrentStoreContent('user_ticket_email');
  // update current store content for tktAddress
  let cachedValAddress = cachedReviewDetails.address || '';
  let cachedValPinCode = cachedReviewDetails.pinCode || '';
  if (cachedValAddress || cachedValPinCode) {
    currentStoreVal.tktAddress = {};
    currentStoreVal.tktAddress.address =
      currentStoreVal.tktAddress &&
      Object.keys(currentStoreVal.tktAddress).length &&
      currentStoreVal.tktAddress.address
        ? currentStoreVal.tktAddress.address
        : cachedValAddress;
    currentStoreVal.tktAddress.pinCode =
      currentStoreVal.tktAddress &&
      Object.keys(currentStoreVal.tktAddress).length &&
      currentStoreVal.tktAddress.pinCode
        ? currentStoreVal.tktAddress.pinCode
        : cachedValPinCode;
  }
  updateLocalStorage(cachedReviewDetails);
  return currentStoreVal;
}

export function updatePassengerInfoFromCache(storeVal) {
  const { currentStoreVal, cachedReviewDetails } = getConvertedObjects(storeVal);
  let { allPassengers, selectedPassengersIndices = [] } = currentStoreVal;
  if (allPassengers && allPassengers.length > 0) {
    cachedReviewDetails.allPassengers = allPassengers;
    updateLocalStorage(cachedReviewDetails);
  } else if (cachedReviewDetails.allPassengers && cachedReviewDetails.allPassengers.length > 0) {
    allPassengers = cachedReviewDetails.allPassengers;
    selectedPassengersIndices = cachedReviewDetails.selectedPassengersIndices || [];
  }
  return [allPassengers, selectedPassengersIndices, cachedReviewDetails.irctcIds];
}

export const getReviewBaseURL = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device
    return '/trains/review/m/';
  } else {
    // false for not mobile device
    return '/trains/review/d/';
  }
};
