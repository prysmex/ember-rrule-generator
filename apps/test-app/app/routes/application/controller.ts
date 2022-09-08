import Controller from '@ember/controller';

import RRuleGenerator from 'ember-rrule-generator/components/r-rule-generator';
import DatePicker from 'test-app/components/date-picker';
import Select from 'test-app/components/select';
import After from 'test-app/components/after';
import OnDate from 'test-app/components/on-date';

export default class ApplictionController extends Controller {
  RRuleGenerator = RRuleGenerator;
  DatePicker = DatePicker;
  Select = Select;
  After = After;
  OnDate = OnDate;
}
