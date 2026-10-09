import { Frequency } from 'rrule';

const computeHourly = ({
  interval
}) => ({
  freq: Frequency.HOURLY,
  interval
});

export { computeHourly as default };
//# sourceMappingURL=computeHourly.js.map
