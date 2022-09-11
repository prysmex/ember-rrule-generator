import { Frequency } from 'rrule';

const computeWeeklyInterval = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.WEEKLY) {
    return data.repeat.weekly.interval || 1;
  }

  return rruleObj.interval || 1;
};

export default computeWeeklyInterval;
