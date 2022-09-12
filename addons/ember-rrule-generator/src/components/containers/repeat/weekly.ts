import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import { toPairs } from 'lodash-es';
import type RRuleGenerator from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

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
          label: translateLabel(
            this.args.translations,
            `days_short.${dayArray[0].toLowerCase()}`
          ),
          isActive: dayArray[1],
        },
        dayArray[1],
      ];
    });
  }

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.weekly.label'),
      every: translateLabel(this.args.translations, 'repeat.weekly.every'),
      weeks: translateLabel(this.args.translations, 'repeat.weekly.weeks'),
      which: translateLabel(this.args.translations, 'repeat.weekly.weeks'),
    };
  }
}
