import { RRule } from 'rrule';

import computeStart from './computeStart';
import computeRepeat from './computeRepeat';
import computeEnd from './computeEnd';
import computeOptions from './computeOptions';
import computeTimezone from './computeTimezone';

const computeRRule = ({ start, repeat, end, timezone, options }) => {
  const rruleObject = {
    ...computeStart(start),
    ...computeRepeat(repeat),
    ...computeEnd(end),
    ...computeTimezone(timezone),
    ...computeOptions(options),
  };
  const rrule = new RRule(rruleObject);
  return rrule.toString();
};

export default computeRRule;
