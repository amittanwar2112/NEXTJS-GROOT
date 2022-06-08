import { Fragment, useState, useContext, useEffect } from 'react';
import Calendar from './Daypicker';
import { SearchContext } from '@contexts/SearchContext';
import { getMonthYearForDate, DAYS, convertToDateObj, getFormattedDate, updateSearchToLocalStorage, initiateSearch } from '@helpers/utils';
import { callAvailability } from '@helpers/utils';
import { pushTapEvent } from '@helpers/gaEvents';
import { getReviewBaseURL } from '@helpers/utils/dwebReviewUtils';

const now = new Date();
let todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
const todayDateString = todayDate.toDateString();
const tomorrowDateString = new Date(todayDate.setDate(todayDate.getDate() + 1)).toDateString();
todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);

const CalendarMain = ( { resetErrorMessage = () => {} } ) => {
  const { storeState, dispatch } = useContext(SearchContext);
  const { date, showCalendar, source, destination, train, availability, classType:travelClass } = storeState;
  const { name, classes = [], number = '', TrainText = '' } = train;
  const {irctc_code: src} = source;
  const {irctc_code: dest} = destination;

  let dateObj = convertToDateObj(date);

  const [today, setToday] = useState(false);
  const [tomorrow, setTomorrow] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [showAvl, setShowAvl] = useState(true);
  const [month, setMonth] = useState(0);

  const handleDateTabClick = (ev, numberOfDays) => {
    let newDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 12, 0, 0);
    if (numberOfDays) {
      newDate = new Date(newDate.setDate(newDate.getDate() + numberOfDays));
    }
    let eventName = numberOfDays === 0 ? 'trainNewDHome_todayClick' : 'trainNewDHome_tomorrowClick';
    pushTapEvent(eventName);
    cbOnDateSelect(newDate);
  }

  const dispatchToStore = (data) => {
    dispatch({
      type: 'UPDATE_STORE',
      data
    });
  }

  const cbOnCloseCalendar = () => {
    const monthInStore = Number(date.slice(4,6));
        setMonth(monthInStore);
        dispatchToStore({ availability:[], showCalendar: false });
  }

  const cbOnDateSelect = (selectedDate) => {
    resetErrorMessage('invalidDate');
    setMonth((selectedDate.getMonth()+1));
    checkSelectedDayIsInTabs(selectedDate);
    dispatchToStore({date: getFormattedDate(selectedDate, 'yyyymmdd'), showCalendar: false});
  }

  const checkSelectedDayIsInTabs = (selectedDate) => {
    const selectedDateString = selectedDate.toDateString();
    const isToday = todayDateString === selectedDateString;
    const isTomorrow = tomorrowDateString === selectedDateString;
    setToday(isToday);
    setTomorrow(isTomorrow);
  }

  const handleLocalStorageCache = () => {
    const prevSearchCache = JSON.parse(localStorage.getItem('recentTrainSearches')) || [];
    if (!prevSearchCache[0]) {
      return null;
    }
    const { date } = prevSearchCache[0];
    if (date) {
      const localSelectedDay = new Date(date.substr(0, 4), Number(date.substr(4, 2)) - 1,  date.substr(6, 2), 0, 0, 0);
      const selectedDay = new Date(date.substr(0, 4), Number(date.substr(4, 2)) - 1,  date.substr(6, 2), 12, 0, 0);
      const todayMidNight = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
      if (selectedDay > todayMidNight) {
        checkSelectedDayIsInTabs(selectedDay);
        dispatchToStore({date: getFormattedDate(selectedDay, 'yyyymmdd')});
        setMonth((selectedDay.getMonth()+1));
      }
    }
  }

  const handleTrainNameClick = () => {
    setIsActive(true);
    setShowAvl(true);
    pushTapEvent(`trainNewDHome_clickTrainNameToggler`)
  }

  const handleAllTrainClick = () => {
    setIsActive(false);
    setShowAvl(false);
    pushTapEvent(`trainNewDHome_clickAllTrainsToggler`);
  }

  const handleAvlChange = () => {
    const {number: trainNumber} = train;
    const monthinStore = Number(date.slice(4,6));
    if(isActive && (!availability.length && trainNumber )) {
      let monthApi = month === 13 ? 1 : (month === 0 ? 12 : month);
      callAvailability({src, dest, trainNumber, classType: travelClass, month: monthApi})
      .then(availability => {
        dispatchToStore({
          availability
        });
        setShowAvl(availability.length);
      });
    }
  }

  const onChangeClassType = (class_type) => {
    dispatchToStore({classType: class_type, availability: []});
    const classSelected = class_type;
  }

  const cbOnMonthChange = (m) => {
    dispatchToStore({availability: []});
    setMonth((m+1));
  }

  const renderDate = (dateObj, addedClass='', isDisabled, handleDateClick) => {
    const dateVal = dateObj.getDate();
    const checkForStyle = showAvl ? (availability.length && availability[dateVal-1] && (availability[dateVal-1].status_color || 'lightgrey')) : '';
    const style = checkForStyle ? `color: ${availability[dateVal-1].status_color}; justify-content: center` : '';
    const bgStyle = checkForStyle ? (checkForStyle!=='lightgrey'? (`background-color: ${availability[dateVal-1].status_color}; color: white;`) : (`background-color: lightgrey;`)) : '';

    const updateDate = () => {
      const monthInDate = dateObj.getMonth() + 1;
      const m = monthInDate < 10 ? '0'+String(monthInDate) : (monthInDate);
      const d = dateVal<10 ? '0'+String(dateVal) : dateVal;
      const date = String(dateObj.getFullYear()) + String(m) + String(d);
      if (checkForStyle && (checkForStyle !== 'rgb(255, 21, 21)'&& checkForStyle !== '#ff1515' && checkForStyle !== 'lightgrey')) {
        pushTapEvent(`trainNewDHome_chooseDateAvlCalendar_Review`);
        updateSearchToLocalStorage({source, destination, date, train});
        window.location.href = `${getReviewBaseURL()}?query=${src}-${dest}-${date}-${number}-${travelClass}-GN&username=&track=AvlCalendar&enable_fc=true&enable_tg=false`;
      } else if(number) {
        pushTapEvent(`trainNewDHome_chooseDateAvlCalendar_SRP`);
        const utmParam = showAvl ? 'AvlCalendar' : 'Normal_calendar_in_avl_calendar';
        initiateSearch({source, destination, train, date }, utmParam, utmParam);
      }
    }

    return (
      <div className="DayPicker-Day-wrap curPoint">
        <div className={'DayPicker-Day txtCenter ' + addedClass + ' availabilityStatus'} style={bgStyle+(isDisabled ? "pointer-events:none;" : "")} onClick={() => {handleDateClick({isDisabled, dateVal}); updateDate();}}>
          {dateVal}
        </div>
        {(showAvl && availability.length && availability[dateVal-1] && availability[dateVal-1].status && (
          <div className="width100 ico12 availabilityStatus bold padT5 flex" style={style}>
            { availability[dateVal-1].status }
          </div>))||[]}
      </div>
    );
  }

  const renderToggler = () => {
    return (
      <div className="padT20 padLR20">
        <div className="trainTypeTabs">
            <p className={"curPoint "+(isActive ? "active" : "")} onClick={handleTrainNameClick}><span>{TrainText}</span></p>
            <p className={"curPoint "+(!isActive ? "active" : "")} onClick={handleAllTrainClick}><span>All Trains</span></p>
        </div>
        {isActive ? (
        <Fragment >
          {/* <p class="fontQuick fb ico18 padB20">{TrainText}</p> */}
          <div className="trainClassTabs">
          {classes.map((class_type,index) =>
            (<p key={index} className={"curPoint " +(travelClass === class_type ? "active" : "")} onClick={() => onChangeClassType(class_type)}><span>{class_type}</span></p>)
          )}
        </div>
        </Fragment>) : null}
      </div>
    );
  }
  const renderFooter = () => {
    return (
      <Fragment>
        {
          isActive ? (
            <div className="calendarFooter">
                  <p className="ico14 grey50 padB10">Color codes</p>
                  <div className="flex row alignCenter">
                     <div className="padR10">
                        <span className="dots calGreen"></span>
                        <span className="ico12 grey75">Available, RAC</span>
                     </div>
                     <div className="padR10">
                        <span className="dots calOrange"></span>
                        <span className="ico12 grey75">Waiting List</span>
                     </div>
                     <div className="padR10">
                        <span className="dots calGrey"></span>
                        <span className="ico12 grey75">Status unknown</span>
                     </div>
                  </div>
                  <div className="padT10">
                     <span className="dots calRed"></span>
                     <span className="ico12 grey75">Regret, Departed, Train doesnot run</span>
                  </div>
               </div>
          ) :  null
        }
      </Fragment>
    )
  }

  useEffect(() => {
    setMonth((dateObj.getMonth()+1));
    handleLocalStorageCache();
  }, []);

  useEffect(() => {
    if(showCalendar && showAvl) {
      handleAvlChange();
    }
  }, [showCalendar, month, travelClass, showAvl]);

  const dateInputValue = getMonthYearForDate(dateObj);
  const day = DAYS[dateObj.getDay()];

  return (
    <Fragment>
      <div className="width50">
        <label>
          <p className="grey50 ico16 padB5">Date</p>
          <p className="widgetInput width100 textInput width100" style={{marginLeft: '1px'}} onClick={() => { console.log({showCalendar});dispatchToStore({showCalendar: true})}}>{day}, {dateInputValue}</p>
        </label>
        {showCalendar ?
          <div className="calendarWrap">
            <Calendar
            cbOnCloseCalendar={cbOnCloseCalendar}
            cbOnDateSelect={cbOnDateSelect}
            selectedDay={dateObj}
            hasAllTrainsToggler={classes.length}
            renderToggler={renderToggler}
            renderDate={renderDate}
            cbOnMonthChange={cbOnMonthChange}
            renderFooter={renderFooter}
          />
          </div>
         : null}
        </div>
        <div className="DateToggleWrap">
          <p className="grey50 ico16 padB5 vh">Date</p>
          <div className="flex row">
            <label className="padR20">
              <span className="padR5">
                <input id="today" checked={today} onChange={(ev) => handleDateTabClick(ev, 0)} type="radio" name="day"/>
              </span>
              <span className="fontQuick ico16 fb">Today</span>
            </label>
            <label className="padL20">
              <span className="padR5">
                <input id="today" checked={tomorrow}  onChange={(ev) => handleDateTabClick(ev, 1)} type="radio" name="day"/>
              </span>
              <span className="fontQuick ico16 fb">Tommorow</span>
            </label>
          </div>
        </div>
    </Fragment>
  );
}

export default CalendarMain;