import { Frequency } from 'rrule';

const computeDailyInterval = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.DAILY) {
    return data.repeat.daily.interval || 1;
  }

  return rruleObj.interval || 1;
};

export default computeDailyInterval;
