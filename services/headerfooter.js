import { HEADER_URL, FOOTER_DATA_URL } from './config';

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

export const getFooter = () => {
  const url = FOOTER_DATA_URL;
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
