import { Frequency } from 'rrule';

const computeYearlyMode = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.YEARLY || !rruleObj.bymonth) {
    return data.repeat.yearly.mode;
  }

  if (rruleObj.bymonthday) {
    return 'on';
  }

  return 'on the';
};

export default computeYearlyMode;
