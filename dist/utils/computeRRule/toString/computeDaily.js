import { Frequency } from 'rrule';

const computeDaily = ({
  interval
}) => ({
  freq: Frequency.DAILY,
  interval
});

export { computeDaily as default };
//# sourceMappingURL=computeDaily.js.map
