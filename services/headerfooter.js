import { HEADER_URL, FOOTER_DATA_URL, FOOTER_DATA } from './config';

export const getHeader = () => {
  const url = HEADER_URL;
  const requestOptions = {
    method: 'GET'
  };

  try {
    const data = fetchFromApi(url, requestOptions);
    return data;
  } catch (error) {
    //   logger.error(JSON.stringify(error));
    throw error;
  }
};

export const getFooter = async () => {
  const url = FOOTER_DATA_URL;
  const requestOptions = {
    method: 'GET'
  };
  try {
    const dataResponseObj = await fetchFromApi(url,requestOptions);
    const hasFooterData = await dataResponseObj && dataResponseObj.status && dataResponseObj.data;
    const footerData = hasFooterData ? hasFooterData : FOOTER_DATA
    if(dataResponseObj.error) {
      handleError('Footer data');
    }
    return footerData;
  } catch (error) {
    const data = FOOTER_DATA;
    handleError('Footer Data', error);
    return data;
  }
};

const fetchFromApi = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    //   logger.info(`Request Tahoe Method returned from DH: ${url}`);
    return data;
  } catch (e) {
    //   logger.error(`Request Tahoe Method [FAILED] : ${url}`, e);
  }

  return null;
};

const handleError = function(msg = '', err = '') {
  console.error('Error getting ', msg, err);
};
