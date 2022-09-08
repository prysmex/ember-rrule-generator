import Controller from '@ember/controller';

import RRuleGenerator from 'ember-rrule-generator/components/r-rule-generator';
import DatePicker from 'test-app/components/date-picker';
import Select from 'test-app/components/select';
import After from 'test-app/components/after';
import OnDate from 'test-app/components/on-date';

import NumberInput from 'test-app/components/repeat/number-input';
import RepeatHourly from 'test-app/components/repeat/hourly';
import RepeatDaily from 'test-app/components/repeat/daily';
import RepeatWeekly from 'test-app/components/repeat/weekly';
import RepeatMonthly from 'test-app/components/repeat/monthly';
import RepeatYearly from 'test-app/components/repeat/yearly';
import RepeatYearlyOnMonth from 'test-app/components/repeat/yearly/on/month';
import RepeatYearlyOnDay from 'test-app/components/repeat/yearly/on/day';

export default class ApplictionController extends Controller {
  RRuleGenerator = RRuleGenerator;
  DatePicker = DatePicker;
  Select = Select;
  After = After;
  OnDate = OnDate;

  NumberInput = NumberInput;

  RepeatHourly = RepeatHourly;
  RepeatDaily = RepeatDaily;
  RepeatWeekly = RepeatWeekly;
  RepeatMonthly = RepeatMonthly;
  RepeatYearly = RepeatYearly;
  RepeatYearlyOnMonth = RepeatYearlyOnMonth;
  RepeatYearlyOnDay = RepeatYearlyOnDay;
}
