import { getAvailability } from "@helpers/api/homeApi";
import {pushToGa, pushTapEvent} from '@helpers/gaEvents';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function loadSiemaCarousel(selectorId, data, noOfItems = 3, shouldMakeAPICall = true) {
  if (!window.__createCarousel) {
    if (!window.__carouselSelecterId) {
      window.__carouselSelecterId = [];
    }
    window.__carouselSelecterId.push({
      selectorId,
      data,
      noOfItems,
      shouldMakeAPICall
    });
    return;
  }
  window.__createCarousel(
    selectorId,
    data,
    noOfItems,
    shouldMakeAPICall
  );
}

export function callAvailability(availabilityOptions = {}) {
  return getAvailability(availabilityOptions)
  .then((resp) => {
    let availability = [];
      const results = resp && resp.response && resp.response.results[0];
      for(var o in results) {
        availability.push(results[o]);
      }
      return availability;
  });
}

export function findRecentlySearchedUniqueStations(list, maxVal = 5) {
  const recentList = [];
  const pushedStations = {};

  function updateItems(station) {
    const code = station.irctc_code;
    if (!pushedStations[code] && recentList.length < maxVal) {
      recentList.push(station);
      pushedStations[code] = true;
    }
  }

  for (let i = 0; i < list.length; i++) {
    if (recentList.length < maxVal) {
      const { source = {}, destination = {}} = list[i];
      updateItems(source);
      updateItems(destination);
    } else {
      break;
    }
  }

  return recentList;
}

export function updateSearchToLocalStorage(searchItem) {
  let recentTrainSearches = JSON.parse(localStorage.getItem('recentTrainSearches')) || [];
  const { source = {}, destination = {}, date, train = {} } = searchItem;
  const trainsList = recentTrainSearches.filter((item) => {
    return (item.date !== date || item.source.irctc_code !== source.irctc_code || item.destination.irctc_code !== destination.irctc_code);
  });
  trainsList.unshift(searchItem);
  localStorage.setItem('recentTrainSearches', JSON.stringify(trainsList.slice(0, 5)));
}

export function initiateSearch(searchItem, eventName = '', utmParam = '') {
  const { source = {}, destination = {}, train = {} } = searchItem;
  let { date } = searchItem;
  if (isPastDay(date)) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    let monthStr = tomorrow.getMonth() + 1;
    const month = monthStr.toString().length < 2 ? ('0' + monthStr) : monthStr;
    const dateStr = tomorrow.getDate().toString().length < 2 ? ('0' + tomorrow.getDate()) : tomorrow.getDate();
    date = tomorrow.getFullYear().toString() + month + dateStr;console.log({date})
  }
  updateSearchToLocalStorage({ source, destination, date, train });
  let srp_url = '';
  const { number = '' } = train;
  const utm = utmParam ? `track=${utmParam}&` : '';
  const isSelectedTrain = number ? `selected_train=${number}` : '';
  if (window.matchMedia('(min-width: 769px)').matches) {
    // srp_url = `/trains/results?src=${source.irctc_code}&dst=${destination.irctc_code}&date=${date}&class=ALL&srcname=${source.dn}&dstname=${destination.dn}${isSelectedTrain}${utm}`;
    srp_url = `/trains/dsrp/${source.irctc_code}/${destination.irctc_code}/${date}/GN/?${utm}${isSelectedTrain}`;
  } else {
    srp_url = `/trains/srp/${source.irctc_code}/${destination.irctc_code}/${date}/GN/?${utm}${isSelectedTrain}`;
  }
  if (eventName) {
    pushTapEvent(eventName);
  } else {
    pushToGa('search-clicked', { source: source.irctc_code, destination: destination.irctc_code, date, class: 'All', userid: (window.userinfo && window.userinfo.userid) ? window.userinfo.userid : '' });
  }
  window.location.href = srp_url;
}

export function getMonthYearForDate(dateObj) {
  // date : 23 March 2020, then format : 23 Mar 20
  if (dateObj && typeof(dateObj) === 'object') {
    let day = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    year = year.toString().substring(2,4);
    return `${day} ${MONTHS_SHORT[month]} ${year}`;
  }
  return '';
}

export function convertToDateObj(dateVal) {
  if (typeof(dateVal) === 'string' && dateVal.trim().length === 8) {
    const year = parseInt(dateVal.slice(0, 4));
    const month = parseInt(dateVal.slice(4, 6), 10) - 1;
    const date = parseInt(dateVal.slice(6, 8));
    return new Date(year,month,date);
  }
}

export function getFormattedDate(dateObj, type) {
  if (dateObj && typeof(dateObj) === 'object') {
    let day = dateObj.getDate();
    day = day < 10 ? ('0' + day) : day;
    let month = dateObj.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    const year = dateObj.getFullYear();
    if (type === 'yyyymmdd') {
      return year + '' + month + '' + day;
    } else if (type === 'mmmm yyyy') {
      return `${MONTHS[dateObj.getMonth()]} ${year}`;
    }
    return [day, month, year];
  }
  return [];
}

/*
  To Check the Mobile Operating system
*/
export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor;
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows';
  }
  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'IOS';
  }

  return 'unknown';
};

/*
  To Check the browser
*/
export const checkBrowser = (browser = '') => {
  return navigator && navigator?.userAgent?.toLowerCase()?.indexOf(browser) > -1;
};

export const injectPortalContainer = (nodeId) => {
  const el = document.createElement('div');
  el.setAttribute('id', nodeId);
  el.setAttribute('class', nodeId);
  const doesNodeExist = document.getElementById(nodeId);
  return doesNodeExist ? doesNodeExist : document.body.appendChild(el);
};

/*
  To get the Client IP Address
*/
// export const getClientIpAdrress = async () => {
//   try {
//     const result = await publicIp.v4({
//       fallbackUrls: ['https://ifconfig.co/ip']
//     });
//     return result;
//   } catch (error) {
//     console.log('failed to fetch location details', error);
//   }
// };