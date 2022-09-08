import { Frequency } from 'rrule';

import computeYearlyOn from './computeYearlyOn';
import computeYearlyOnThe from './computeYearlyOnThe';

const computeYearly = ({ mode, on, onThe }) => ({
  freq: Frequency.YEARLY,
  ...(mode === 'on' ? computeYearlyOn(on) : computeYearlyOnThe(onThe)),
});

export default computeYearly;
