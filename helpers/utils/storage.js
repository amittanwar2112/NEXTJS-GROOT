const isClient = typeof window !== 'undefined';

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
