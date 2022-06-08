import { getFormattedDate } from '@helpers/utils';

const now = new Date();
let today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
const firstSelectedDate = new Date(today.setDate(today.getDate() + 1));
const firstSelectedDateFormatted = getFormattedDate(firstSelectedDate, 'yyyymmdd')

const initialState = {
  source: {},
  destination: {},
  train: {},
  availability: [],
  date: firstSelectedDateFormatted,
  classType: 'SL',
  invalidSrc: false,
  invalidDes: false,
  invalidDate: false,
  invalidTrain: false,
  sameStation: false,
  errorMsg: '',
  trainsList: {},
  showCalendar: false
};

const searchReducer = (state=initialState, action) => {
  const { data } = action;
  switch(action.type){
    case 'UPDATE_STORE':
      return Object.assign({}, state, data);
    default:
      return state;
  }
};

export default searchReducer;