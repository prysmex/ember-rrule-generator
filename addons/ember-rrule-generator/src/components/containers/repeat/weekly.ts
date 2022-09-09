import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import { toPairs } from 'lodash-es';
import type RRuleGenerator from '../../r-rule-generator/index';

import WeeklyInterval from './weekly-interval';
import WeeklyDays from './weekly-days';

type Weekly = RRuleGenerator['state']['data']['repeat']['weekly'];

type Signature = BaseContainerSignature & {
  Args: {
    weekly: Weekly;
  };
};

export default class ContainersRepeatYearlyOnMonthComponent extends BaseContainerComponent<Signature> {
  WeeklyInterval = WeeklyInterval;
  WeeklyDays = WeeklyDays;

  get days() {
    let daysArray = toPairs(this.args.weekly.days);
    if (this.args.weekly.options.weekStartsOnSunday) {
      daysArray = daysArray.slice(-1).concat(daysArray.slice(0, -1));
    }
    return daysArray.map((dayArray) => {
      return [
        {
          value: dayArray[0],
          label: dayArray[0],
        },
        dayArray[1],
      ];
    });
  }
}
