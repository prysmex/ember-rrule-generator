import { Frequency } from 'rrule';

const computeHourly = ({ interval }) => ({
  freq: Frequency.MINUTELY,
  interval,
});

export default computeHourly;
