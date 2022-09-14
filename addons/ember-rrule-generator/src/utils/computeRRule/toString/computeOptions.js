import { RRule } from 'rrule';

const computeOptions = ({ hideStart, weekStartsOnSunday, tzid }) => {
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

  return options;
};

export default computeOptions;
