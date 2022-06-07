const eventsList = ['GI:selectTrain', 'GI:selectCategory'];
const isClient = typeof window !== 'undefined';

export const pushEventsToDataLayer = function () {
  if (isClient) window.dataLayer = window.dataLayer || [];
};

export const dispatchLoggingEvent = function (event, detail) {
  if (isClient) {
    document.dispatchEvent(new CustomEvent(event, { detail: detail }));
    // add event data to dataLayer only if present in eventList
    if (eventsList.indexOf(event) > -1 && window.dataLayer) window.dataLayer.push(detail);
  }
};
