import { Frequency } from 'rrule';

const computeYearlyInterval = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.YEARLY) {
    return data.repeat.yearly.interval || 1;
  }

  return rruleObj.interval || 1;
};

export default computeYearlyInterval;
