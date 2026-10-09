import { Frequency } from 'rrule';

const computeHourly = ({
  interval
}) => ({
  freq: Frequency.MINUTELY,
  interval
});

export { computeHourly as default };
//# sourceMappingURL=computeMinutely.js.map
