import { Frequency } from 'rrule';

const computeYearlyOnMonthday = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.YEARLY || !rruleObj.bymonthday) {
    return data.repeat.yearly.on.day;
  }

  if (typeof rruleObj.bymonthday === 'number') {
    return rruleObj.bymonthday;
  }

  return rruleObj.bymonthday[0];
};

export default computeYearlyOnMonthday;
