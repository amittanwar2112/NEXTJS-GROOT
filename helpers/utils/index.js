import { getAvailability } from '@helpers/api/homeApi';
import { pushToGa, pushTapEvent } from '@helpers/gaEvents';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
export const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
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
  window.__createCarousel(selectorId, data, noOfItems, shouldMakeAPICall);
}

export function callAvailability(availabilityOptions = {}) {
  return getAvailability(availabilityOptions).then((resp) => {
    let availability = [];
    const results = resp && resp.response && resp.response.results[0];
    for (var o in results) {
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
      const { source = {}, destination = {} } = list[i];
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
    return (
      item.date !== date ||
      item.source.irctc_code !== source.irctc_code ||
      item.destination.irctc_code !== destination.irctc_code
    );
  });
  trainsList.unshift(searchItem);
  localStorage.setItem('recentTrainSearches', JSON.stringify(trainsList.slice(0, 5)));
}

export function changeStrToDate(dateStr) {
  if (typeof dateStr === 'string' && dateStr.trim().length === 8) {
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6), 10) - 1;
    const date = parseInt(dateStr.slice(6, 8));
    const formatter = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'short'
    });
    return formatter.format(new Date(year, month, date));
  }
}

export function initiateSearch(searchItem, eventName = '', utmParam = '') {
  const { source = {}, destination = {}, train = {} } = searchItem;
  let { date } = searchItem;
  if (isPastDay(date)) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    let monthStr = tomorrow.getMonth() + 1;
    const month = monthStr.toString().length < 2 ? '0' + monthStr : monthStr;
    const dateStr =
      tomorrow.getDate().toString().length < 2 ? '0' + tomorrow.getDate() : tomorrow.getDate();
    date = tomorrow.getFullYear().toString() + month + dateStr;
    console.log({ date });
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
    pushToGa('search-clicked', {
      source: source.irctc_code,
      destination: destination.irctc_code,
      date,
      class: 'All',
      userid: window.userinfo && window.userinfo.userid ? window.userinfo.userid : ''
    });
  }
  window.location.href = srp_url;
}

export function getMonthYearForDate(dateObj) {
  // date : 23 March 2020, then format : 23 Mar 20
  if (dateObj && typeof dateObj === 'object') {
    let day = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    year = year.toString().substring(2, 4);
    return `${day} ${MONTHS_SHORT[month]} ${year}`;
  }
  return '';
}

export function convertToDateObj(dateVal) {
  if (typeof dateVal === 'string' && dateVal.trim().length === 8) {
    const year = parseInt(dateVal.slice(0, 4));
    const month = parseInt(dateVal.slice(4, 6), 10) - 1;
    const date = parseInt(dateVal.slice(6, 8));
    return new Date(year, month, date);
  }
}

export function getFormattedDate(dateObj, type) {
  if (dateObj && typeof dateObj === 'object') {
    let day = dateObj.getDate();
    day = day < 10 ? '0' + day : day;
    let month = dateObj.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
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

export const isMobile = () => {
  let check = false;
  if (typeof window !== 'undefined') {
    ((a) => {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
      //@ts-ignore
    })(navigator.userAgent || navigator.vendor || window.opera);
  }
  return check;
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
