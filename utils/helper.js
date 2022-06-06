// import publicIp from 'public-ip';
// import logger from 'next-pino/logger';

const isClient = typeof window !== 'undefined';

/*
  To Check if the email is valid or not
*/
export const emailRegex = (value) => {
  const response = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  )
    ? true
    : false;
  return response;
};

/*
  To Check if it is mobile or not
*/
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
  To Get the Cookie
*/
export const getCookie = (name) => {
  if (typeof window !== 'undefined') {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  } else return null;
};

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

export const setSessionItem = (key, value) => {
  try {
    isClient && window.sessionStorage.setItem(key, window.btoa(JSON.stringify(value)));
  } catch (error) {
    // do nothing
  }
};

export const getSessionItem = (key) => {
  try {
    const encodedValue = window.sessionStorage.getItem(key);
    if (encodedValue) return JSON.parse(window.atob(encodedValue));
    return null;
  } catch (error) {
    return null;
  }
};

export const removeSessionItem = (key) => {
  try {
    isClient && window.sessionStorage.removeItem(key);
  } catch (error) {
    // do nothing
  }
};

export const getLocalStorageItem = (key) => {
  try {
    return isClient && JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    // do nothing
    //logger.error(error);
    return JSON.parse(null);
  }
};

export const setLocalStorageItem = (key, value) => {
  try {
    isClient && window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // do nothing
    //logger.error(error);
  }
  return;
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