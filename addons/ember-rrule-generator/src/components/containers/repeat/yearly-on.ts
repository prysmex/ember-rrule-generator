import BaseHandlerComponent from '../base-handler';
import YearlyOnMonth from './yearly-on-month';
import YearlyOnDay from './yearly-on-day';

export default class ContainersRepeatYearlyComponent extends BaseHandlerComponent {
  YearlyOnMonth = YearlyOnMonth;
  YearlyOnDay = YearlyOnDay;
}
