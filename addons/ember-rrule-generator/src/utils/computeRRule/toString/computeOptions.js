import { RRule } from 'rrule';

const computeOptions = ({
  hideStart,
  weekStartsOnSunday,
  tzid,
  removeTimezone,
}) => {
  const options = {};

  if (hideStart) {
    options.dtstart = null;
  }

  if (weekStartsOnSunday) {
    options.wkst = RRule.SU;
  }

  if (tzid) {
    options.tzid = tzid;
  }

  if (removeTimezone) {
    options.tzid = null;
  }

  return options;
};

export default computeOptions;
