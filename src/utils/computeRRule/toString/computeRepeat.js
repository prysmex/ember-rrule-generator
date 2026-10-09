import computeYearly from './computeYearly.js';
import computeMonthly from './computeMonthly.js';
import computeWeekly from './computeWeekly.js';
import computeDaily from './computeDaily.js';
import computeHourly from './computeHourly.js';
import computeMinutely from './computeMinutely.js';

const computeRepeat = ({
  frequency,
  yearly,
  monthly,
  weekly,
  daily,
  hourly,
  minutely,
}) => {
  switch (frequency) {
    case 'Yearly': {
      return computeYearly(yearly);
    }
    case 'Monthly': {
      return computeMonthly(monthly);
    }
    case 'Weekly': {
      return computeWeekly(weekly);
    }
    case 'Daily': {
      return computeDaily(daily);
    }
    case 'Hourly': {
      return computeHourly(hourly);
    }
    case 'Minutely': {
      return computeMinutely(minutely);
    }
    default:
      return {};
  }
};

export default computeRepeat;
