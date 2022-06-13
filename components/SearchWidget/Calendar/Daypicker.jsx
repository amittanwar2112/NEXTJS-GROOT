import { useState } from 'react';
import OutsideAlerter from '../../Home/useOutsideAlerter';
import Month from './Month';

const Daypicker = ({ selectedDay = new Date(), cbOnCloseCalendar= ()=>{}, cbOnDateSelect = ()=>{}, hasAllTrainsToggler = false, renderToggler = () => {}, cbOnMonthChange = () => {}, renderDate, getDisabledDays=()=>{}, daysOfRun = {}, renderFooter = () => {}}) => {
  const [selectedDate, setSelectedDate] = useState(selectedDay);
  const [dateConfig, setDateConfig] = useState(selectedDay);
  const monthSelected = dateConfig.getMonth();
  const currentMonth = new Date().getMonth();
  const lastMonth = new Date(new Date().setDate(new Date().getDate() + 124)).getMonth();

  const updateDate = (dateVal, monthVal, yearVal) => {
    const newDate = new Date(yearVal, monthVal, dateVal, 12, 0, 0);
    setSelectedDate(newDate);
    cbOnDateSelect(newDate);
  };

  const changeMonth = (nextMonth) => {
    const shouldNotChangeMonth = (nextMonth===-1 && monthSelected === currentMonth) ||  (nextMonth===1 && monthSelected === lastMonth);
    if(!shouldNotChangeMonth){
      const year = dateConfig.getFullYear();
      const month = dateConfig.getMonth() + (nextMonth);
      cbOnMonthChange(month);

      let newDateConfig = new Date(year, month, 1, 12, 0, 0);
      setDateConfig(newDateConfig);
    }
  }

  return (
      <OutsideAlerter styles="calendarWidget" cb={cbOnCloseCalendar}>
          <div className="DayPicker" >
            {/* <div class="calendarTitle">
              <span>Choose Date</span>
              <span class="curPoint" onClick={() => {cbOnCloseCalendar();}}><i class="icon-close ico20"></i></span>
            </div> */}
            {hasAllTrainsToggler ? renderToggler() : null}
            <div className="DayPicker-NavBar">
            <span onClick={() => {
                changeMonth(-1)
            }}>
                {monthSelected !== currentMonth ? (
                   <span role="button" aria-label="Previous Month" className="nextNav curPoint">
                    <i className="icon-arrow-back ico12 goBlue"></i>
                  </span>
                ) : null }
              </span>
              <span onClick={() => {
                changeMonth(1)
              }}>
                {monthSelected !== lastMonth ? (
                   <span role="button" aria-label="Next Month" className="nextNav curPoint">
                    <i className="icon-arrow-forward ico12 goBlue"></i>
                  </span>
                ) : null }
              </span>
            </div>
            <Month month={dateConfig.getMonth()} year={dateConfig.getFullYear()} updateDate={updateDate} selectedDay={selectedDay} renderDate={renderDate} daysOfRun={daysOfRun} getDisabledDays={getDisabledDays} />
          </div>
          {hasAllTrainsToggler ? renderFooter() : null}
      </OutsideAlerter>
  );
}

export default Daypicker;