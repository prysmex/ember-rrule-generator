import { Frequency } from 'rrule';
import { values } from 'lodash-es';

const computeWeekly = ({ interval, days }) => ({
  freq: Frequency.WEEKLY,
  interval,
  byweekday: values(days).reduce(
    (activeDays, isDayActive, dayIndex) =>
      isDayActive ? [...activeDays, dayIndex] : activeDays,
    []
  ),
});

export default computeWeekly;
