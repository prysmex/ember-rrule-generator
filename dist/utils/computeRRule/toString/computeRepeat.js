import computeYearly from './computeYearly.js';
import computeMonthly from './computeMonthly.js';
import computeWeekly from './computeWeekly.js';
import computeDaily from './computeDaily.js';
import computeHourly$1 from './computeHourly.js';
import computeHourly from './computeMinutely.js';

const computeRepeat = ({
  frequency,
  yearly,
  monthly,
  weekly,
  daily,
  hourly,
  minutely
}) => {
  switch (frequency) {
    case 'Yearly':
      {
        return computeYearly(yearly);
      }
    case 'Monthly':
      {
        return computeMonthly(monthly);
      }
    case 'Weekly':
      {
        return computeWeekly(weekly);
      }
    case 'Daily':
      {
        return computeDaily(daily);
      }
    case 'Hourly':
      {
        return computeHourly$1(hourly);
      }
    case 'Minutely':
      {
        return computeHourly(minutely);
      }
    default:
      return {};
  }
};

export { computeRepeat as default };
//# sourceMappingURL=computeRepeat.js.map
