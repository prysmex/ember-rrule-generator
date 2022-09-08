import { Frequency } from 'rrule';

import computeMonthlyOn from './computeMonthlyOn';
import computeMonthlyOnThe from './computeMonthlyOnThe';

const computeMonthly = ({ mode, interval, on, onThe }) => ({
  freq: Frequency.MONTHLY,
  interval,
  ...(mode === 'on' ? computeMonthlyOn(on) : computeMonthlyOnThe(onThe)),
});

export default computeMonthly;
