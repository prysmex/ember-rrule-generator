import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import MonthlyOnTheDay from './monthly-on-the-day';
import MonthlyOnTheWhich from './monthly-on-the-which';

import type RRuleGenerator from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type OnThe = RRuleGenerator['state']['data']['repeat']['monthly']['onThe'];

import { DAYS } from 'ember-rrule-generator/utils/constants';

type Signature = BaseContainerSignature & {
  Args: {
    onThe: OnThe;
  };
};

export default class ContainersRepeatMonthlyOnTheComponent extends BaseContainerComponent<Signature> {
  MonthlyOnTheDay = MonthlyOnTheDay;
  MonthlyOnTheWhich = MonthlyOnTheWhich;

  get days() {
    return DAYS.map((day) => {
      return {
        value: day,
        label: translateLabel(
          this.args.translations,
          `days.${day.toLowerCase()}`
        ),
      };
    });
  }

  get whichs() {
    return [
      {
        value: 'First',
        label: translateLabel(this.args.translations, 'numerals.first'),
      },
      {
        value: 'Second',
        label: translateLabel(this.args.translations, 'numerals.second'),
      },
      {
        value: 'Third',
        label: translateLabel(this.args.translations, 'numerals.third'),
      },
      {
        value: 'Fourth',
        label: translateLabel(this.args.translations, 'numerals.fourth'),
      },
      {
        value: 'Last',
        label: translateLabel(this.args.translations, 'numerals.last'),
      },
    ];
  }
}
