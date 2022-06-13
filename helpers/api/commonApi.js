const contentTypeJSon = 'application/json;'
const contentEncoded = 'application/x-www-form-urlencoded; charset=UTF-8';
const authorization = 'Basic V2dUM2U2R3E4WTprUDdOeFZKak45bTh1TUxGM0djRHRwVFB1YUxqUDZ3Vg==';

export const fetchResponse = (url, configuration = {}) => {
  const { method = 'GET', data, encoded = false } = configuration;
  const gi_config = {
    method,
    credentials: 'include',
    headers: {
      ['Content-Type']: encoded ? contentEncoded: contentTypeJSon,
      authorization
    }
  };
  if (data) {
    gi_config.body = encoded ? data: JSON.stringify(data);
  }
  return fetch(url, gi_config).then((res) => {
    return res.json();
  });
};

export function knowIfUserIsLoggedIn() {
  const url = `/common/userwidget/?random=${Math.random()}`;
  return fetch(url, {credentials: 'include'})
  .then(resp => {
    return resp.json();
  })
  .then(resp => {
    if (resp && resp.userinfo && resp.userinfo.userid) {
      return resp;
    }
    return false;
  }).catch(err => console.log(err));
}
