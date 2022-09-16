import { MONTHS } from '../../constants';
import { Frequency } from 'rrule';

const computeYearlyOnTheMonth = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.YEARLY || !rruleObj.byweekday) {
    return data.repeat.yearly.onThe.month;
  }

  if (typeof rruleObj.bymonth === 'number') {
    return MONTHS[rruleObj.bymonth - 1];
  }

  return MONTHS[rruleObj.bymonth[0] - 1];
};

export default computeYearlyOnTheMonth;
