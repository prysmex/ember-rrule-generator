import { Frequency } from 'rrule';

const computeHourly = ({ interval }) => ({
  freq: Frequency.HOURLY,
  interval,
});

export default computeHourly;
