export const loading = 'Loading...';
export const errorText = 'Something went wrong, Please try again';
export const errorToastMessage =
  'Sorry, we are getting some issue right now. Please try again later.';

export const ALL_TRAIN_ROUTES = {
  HEALTH_CHECK: '/groot/ping*',
  HEALTH_CHECK_API: '/trains/api/health',
  STATUS_INFO: '/trains/statusinfo*',
  METRO_FAQ: '/trains/metro-faq*',
  WIDGET: '/trains/widget/',
  WIDGETAPI: '/trains/widget-api/',
  PURGE_TRAINS: '/trains/purge/*',
  TAKE_SCREENSHOT: '/trains/middleware/takescreenshot/',
  TRAINS_REDIRECT: '/trains/redirect',

  TRAIN_ROUTES: '/trains/*',
  HOME_MWEB: '/trains/m',
  HOME_DWEB: '/trains',
  SRP: '/trains/srp/',
  SRP_DWEB: '/trains/dsrp/',
  REVIEW_MWEB: '/trains/review/m/',
  REVIEW_DWEB: '/trains/review/d/',
  REVIEW: '/trains/review/',
  CREATE_USERID: '/trains/create-irctc-account/',
  OLD_CREATE_USERID: '/trains/irctc-create-userid/',
  RESET_USER_ID: '/trains/irctc-forgot-userid/',
  FORGOT_PASSWORD_ROUTE: '/trains/irctc-forgot-password/',
  PNR_HOME: '/trains/check-pnr-status/',
  PNR_RESULT: '/trains/view/pnr-result/',
  TRAIN_STATUS_HOME: '/trains/check-train-running-status/',
  TRAIN_STATUS_RESULT: '/trains/app/trainstatus/results/',
  PL_HOME: '/trains/platform-locator/',
  PL_RESULT_URL: '/trains/platform-locator-results/',
  THANK_YOU: '/trains/booking/info/',

  TRAINS_HOME: `/trains/home/`,
  COVID_SRP: '/trains/home/covid-trains/',
  COVID_HOME: `/trains/home/covid-search/`,
  COVID_EPASS: `/trains/home/covid-epass/`,
  COVID_TRAVEL_OPTIONS: `/trains/home/covid-travel-options/`,
  COVID_TNC: '/trains/home/tnc-covid*',
  DWEB_PAYMENT: '/trains/pay/d/'
};

export const CAB_EPASS = '/cars/covid-epass/';

export const IRCTC_LOGO_URL = 'https://gos3.ibcdn.com/itctcnew_logo-1573024091.png';

/* Application Texts */
/* containers/forgotpassword */
export const FALLBACK_FORGOT_PWD_ERR_MSG = 'Invalid User ID or Mobile Number!';
export const FORGOTPASSWORD_HEADING = 'Change IRCTC Password';
export const RESET_PWD_ATTEMPT_TEXT =
  'Maximum of 5 attempts to generate Passwords are allowed daily by IRCTC';
export const USER_ID_INPUT_HEADING = 'IRCTC User ID';
export const EMPTY_USER_ID_ERR_MSG = 'User ID cannot be empty';
export const INVALID_USER_ID = 'Invalid User ID';
export const MOBILE_NUMBER_INPUT_HEADING = 'IRCTC Registered Mobile Number';
export const MOBILE_NUM_PLACE_HOLDER = ' Mobile Number';
export const EMPTY_MOB_NUM_ERR_MSG = 'Mobile Number cannot be empty';
export const INVALID_MOB_NUM = 'Invalid Mobile Number';
export const MOBILE_NUM_PREFIX = '+91';
export const INDIAN_FLAG_IMG_URL = 'https://gos3.ibcdn.com/India_flag-1573023941.png';
export const GET_PWD_BTN_TXT = 'Get Password';
export const GET_PWD_INFO_LINE1 = 'You will receive an SMS from IRCTC with your new Password.';
export const GET_PWD_INFO_LINE2 = 'Use this Password to book your train tickets.';
export const SUCCESS_PWD_SENT_HEADING = 'IRCTC password Sent';
export const PLEASE_WAIT_FOR_OTP_MSG = 'Please wait 2 mins for the SMS to reach your device.';
export const SMS_SENT_LINE1 = 'IRCTC has sent an SMS with the Password for the userID: ';
export const SMS_SENT_LINE2 = ' on your registered mobile number ';

/* presentation/successscreen */
export const CONTINUE_BOOKING = 'Continue Booking';

/* containers/NEW USER ID */
export const REQUEST_SENT = 'Request successfully sent to IRCTC';
export const CHANGE_IRCTC_USERNAME_HEADING = 'Retrieve IRCTC Username';
export const REG_EMAIL_ID_OR_MOB_LABEL = 'IRCTC Registered Email ID / Mobile No.';
export const IRCTC_REG_DOB = 'Date of Birth ( As on IRCTC Account )';
export const REQ_USER_ID = 'Request User ID';
export const SUB_TEXT_REQ_USER_ID =
  'You will receive an email from IRCTC with your registered IRCTC userID.';
export const INVALID_DOB = 'Invalid Date of Birth';
export const INVALID_EMAIL_ID = 'Invalid User Email';
export const EMAIL_MOB_PLACE_HOLDER = 'IRCTC Email ID / Mobile No.';
export const FALLBACK_FORGOT_USER_ID_ERR_MSG = 'Invalid User Id or Date of Birth';

/* Search Widget */
export const WIDGET_HEADING = 'Book Train Tickets Online';
export const FROM = 'FROM';
export const TO = 'TO';
export const PLACEHOLDER_SOURCE = 'Select Station / City Name';
export const PLACEHOLDER_DESTINATION = 'Select Station / City Name';
export const SEARCH_BTN_TXT = 'SEARCH';
export const ERROR = 'ERROR';
export const ERR_MSG_START = 'Please select ';
export const ERR_MSG_SRC = 'valid Source Station';
export const ERR_MSG_DES = 'valid Destination Station';
export const ERR_MSG_DATE = 'valid Date';
export const ERR_MSG_CONNECTOR = ' and ';

export const POPULAR_STATIONS_SUGGEST = [
  {
    dn: 'New Delhi Railway Station',
    _id: '8884285607022097366',
    irctc_code: 'NDLS',
    t: 'landmark',
    xtr: {
      st_n: 'Delhi',
      cn: 'Delhi',
      cid: '2820046943342890302'
    }
  },
  {
    dn: 'Bangalore City Junction',
    _id: '9134065066842566418',
    irctc_code: 'SBC',
    t: 'landmark',
    xtr: {
      st_n: 'Karnataka',
      cn: 'Bangalore',
      cid: '6771549831164675055'
    }
  },
  {
    dn: 'Mumbai Cst Railway Station',
    _id: '7554713892384416586',
    irctc_code: 'CSTM',
    t: 'landmark',
    xtr: {
      st_n: 'Maharashtra',
      cn: 'Mumbai',
      cid: '4213513766539949483'
    }
  },
  {
    dn: 'Varanasi Junction',
    _id: '427541232348636180',
    irctc_code: 'BSB',
    t: 'landmark',
    xtr: {
      st_n: 'Uttar Pradesh',
      cn: 'Varanasi',
      cid: '710870868236923145'
    }
  },
  {
    dn: 'Allahabad Junction',
    _id: '455816896693343870',
    irctc_code: 'ALD',
    t: 'landmark',
    xtr: {
      st_n: 'Uttar Pradesh',
      cn: 'Allahabad',
      cid: '2764189059814305450'
    }
  }
];
