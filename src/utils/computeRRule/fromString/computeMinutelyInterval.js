import { Frequency } from 'rrule';

const computeMinutelyInterval = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.MINUTELY) {
    return data.repeat.minutely.interval;
  }

  return rruleObj.interval;
};

export default computeMinutelyInterval;
