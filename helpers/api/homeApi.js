import { fetchResponse } from './commonApi';
export function knowMyTrain(src = '', des = '') {
  const url = `${GO_TRAINS}/v1/search/find_trains_autosuggest/${src}/${des}`;
  return fetchResponse(url);
}

export function getAvailability({src, dest, trainNumber, month, classType = 'SL'}) {
  const url = `${GO_TRAINS}/v1/booking/availability_calendar/${src}/${dest}/${trainNumber}/${month}?flavour=web&noOfMonths=1&class=${classType}`;
  return fetchResponse(url);
}