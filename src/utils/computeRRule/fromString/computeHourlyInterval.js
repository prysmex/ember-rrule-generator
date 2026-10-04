import { Frequency } from 'rrule';

const computeHourlyInterval = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.HOURLY) {
    return data.repeat.hourly.interval;
  }

  return rruleObj.interval;
};

export default computeHourlyInterval;
