import { Frequency } from 'rrule';
import computeMonthlyOn from './computeMonthlyOn.js';
import computeMonthlyOnThe from './computeMonthlyOnThe.js';

const computeMonthly = ({
  mode,
  interval,
  on,
  onThe
}) => ({
  freq: Frequency.MONTHLY,
  interval,
  ...(mode === 'on' ? computeMonthlyOn(on) : computeMonthlyOnThe(onThe))
});

export { computeMonthly as default };
//# sourceMappingURL=computeMonthly.js.map
