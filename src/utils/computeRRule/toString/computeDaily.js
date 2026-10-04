import { Frequency } from 'rrule';

const computeDaily = ({ interval }) => ({
  freq: Frequency.DAILY,
  interval,
});

export default computeDaily;
