import Controller from '@ember/controller';

import RRuleGenerator from 'ember-rrule-generator/components/r-rule-generator';
import DatePicker from 'test-app/components/date-picker';

export default class ApplictionController extends Controller {
  RRuleGenerator = RRuleGenerator;
  DatePicker = DatePicker;
}
