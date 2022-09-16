import { Frequency } from 'rrule';


const computeMonthlyInterval = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.MONTHLY) {
    return data.repeat.monthly.interval || 1;
  }

  return rruleObj.interval || 1;
};

export default computeMonthlyInterval;
