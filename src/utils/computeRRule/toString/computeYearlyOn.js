import { MONTHS } from '../../constants.js';

const computeYearlyOn = (on) => ({
  bymonth: MONTHS.indexOf(on.month) + 1,
  bymonthday: on.day,
});

export default computeYearlyOn;
