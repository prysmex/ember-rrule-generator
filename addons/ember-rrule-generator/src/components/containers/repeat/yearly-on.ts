import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import YearlyOnMonth from './yearly-on-month';
import YearlyOnDay from './yearly-on-day';
import { range } from 'lodash-es';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type RRuleGenerator from '../../r-rule-generator/index';

type On = RRuleGenerator['state']['data']['repeat']['yearly']['on'];

//eslint-disable-next-line
dayjs.extend(customParseFormat);

import { MONTHS } from 'ember-rrule-generator/utils/constants';

type Signature = BaseContainerSignature & {
  Args: {
    on: On;
  };
};

export default class ContainersRepeatYearlyOnComponent extends BaseContainerComponent<Signature> {
  YearlyOnMonth = YearlyOnMonth;
  YearlyOnDay = YearlyOnDay;

  get months() {
    return MONTHS.map((month) => {
      return {
        value: month,
        label: month,
      };
    });
  }

  get days() {
    //eslint-disable-next-line
    const daysInMonth = dayjs(this.args.on.month, 'MMM').daysInMonth();
    //eslint-disable-next-line
    const opts = range(0, daysInMonth).map((day) => {
      return {
        value: day + 1,
        label: day + 1,
      };
    });
    return opts;
  }
}
