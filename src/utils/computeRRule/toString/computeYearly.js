import { Frequency } from 'rrule';

import computeYearlyOn from './computeYearlyOn.js';
import computeYearlyOnThe from './computeYearlyOnThe.js';

const computeYearly = ({ mode, interval, on, onThe }) => ({
  freq: Frequency.YEARLY,
  interval,
  ...(mode === 'on' ? computeYearlyOn(on) : computeYearlyOnThe(onThe)),
});

export default computeYearly;
