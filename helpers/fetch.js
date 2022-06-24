import logger from '../next-pino/logger';

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
};

function get(url) {
  const requestOptions = {
    method: 'GET'
  };
  logger.info(`Request Groot API Method [METHOD]: GET [URL] : ${url}`);
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  logger.info(`Request Groot API Method [METHOD]: POST [URL] : ${url}`);
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  logger.info(`Request Groot API Method [METHOD]: PUT [URL] : ${url}`);
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE'
  };
  logger.info(`Request Groot API Method [METHOD]: DELETE [URL] : ${url}`);
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      logger.info(`Request Groot API Method : [ERROR] : ${error}`);
      return Promise.reject(error);
    }

    return data;
  });
}
