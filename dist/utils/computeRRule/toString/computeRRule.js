import { RRule } from 'rrule';
import computeStart from './computeStart.js';
import computeRepeat from './computeRepeat.js';
import computeEnd from './computeEnd.js';
import computeOptions from './computeOptions.js';
import computeTimezone from './computeTimezone.js';

const computeRRule = ({
  start,
  repeat,
  end,
  timezone,
  options
}) => {
  const rruleObject = {
    ...computeStart(start),
    ...computeRepeat(repeat),
    ...computeEnd(end),
    ...computeTimezone(timezone),
    ...computeOptions(options)
  };
  const rrule = new RRule(rruleObject);
  return rrule.toString();
};

export { computeRRule as default };
//# sourceMappingURL=computeRRule.js.map
