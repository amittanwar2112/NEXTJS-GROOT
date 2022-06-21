import { getFormattedDate } from '@helpers/utils';

const dayList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Month = ({
  month,
  year,
  getDisabledDays = () => {},
  updateDate,
  selectedDay,
  renderDate,
  daysOfRun = {}
}) => {
  const firstDate = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const offset = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1;

  const totalEntriesWithOffset = totalDays + offset;
  const maxRows = Math.ceil(totalEntriesWithOffset / 7);
  const isPresentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

  const handleDateClick = ({ isDisabled, dateVal }) => {
    if (!isDisabled) {
      updateDate(dateVal, month, year);
    }
  };

  const getSelectedDay = (day) => {
    return selectedDay && selectedDay.toDateString() === day.toDateString();
  };

  const isOutOfRange = (day) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
    let lastDay = new Date(new Date().setDate(today.getDate() + 125));
    lastDay = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate(), 12, 0, 0);
    return !(day >= today && day < lastDay);
  };

  return (
    <div className="DayPicker-Month">
      <div className="DayPicker-Caption" role="heading" aria-level="1">
        {getFormattedDate(firstDate, 'mmmm yyyy')}
      </div>
      <div className="DayPicker-Weekdays">
        <div className="DayPicker-WeekdaysRow">
          {dayList.map((item, index) => (
            <li key={index} className={'DayPicker-Weekday db'} role="columnheader">
              <span title={item}>{item}</span>
            </li>
          ))}
        </div>
      </div>
      <div className="DayPicker-Body">
        {new Array(maxRows).fill(1).map((_, rIndex) => {
          const initialJ = rIndex * 7;
          const currentRowMaxLength = (rIndex + 1) * 7;
          const colLength = 7; //currentRowMaxLength < totalEntriesWithOffset ? 7 : (7 - (currentRowMaxLength - totalEntriesWithOffset));
          return (
            <div className="DayPicker-Week" key={rIndex}>
              {new Array(colLength).fill(1).map((__, cIndex) => {
                const dateVal = initialJ + cIndex + 1 - offset;
                const totalCols = rIndex * 7 + cIndex + 1;
                if (dateVal <= 0 || dateVal > totalDays) {
                  return (
                    <div key={cIndex} className="DayPickerDaywrap">
                      <div className="DayPicker-Day DayPicker-Day--disabled DayPicker-Day--outside"></div>
                    </div>
                  );
                }
                const thisDate = new Date(year, month, dateVal, 12, 0, 0);
                const today = new Date();
                const isDisabled = isOutOfRange(thisDate) || getDisabledDays(thisDate);
                const isSelected = getSelectedDay(thisDate);
                let addedClass = '';

                if (
                  today.getDate() === dateVal &&
                  today.getMonth() === month &&
                  today.getFullYear() === year
                ) {
                  addedClass = 'DayPicker-Day--today';
                }
                if (isDisabled) {
                  addedClass = 'DayPicker-Day--disabled DayPicker-Day--outside';
                } else if (isSelected) {
                  addedClass = 'DayPicker-Day--selected';
                }
                return renderDate(thisDate, addedClass, isDisabled, handleDateClick);
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Month;
