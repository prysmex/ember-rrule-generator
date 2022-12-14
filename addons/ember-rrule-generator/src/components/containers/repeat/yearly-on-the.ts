import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import YearlyOnTheMonth from './yearly-on-the-month';
import YearlyOnTheDay from './yearly-on-the-day';
import YearlyOnTheWhich from './yearly-on-the-which';

import type RRuleGenerator from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type OnThe = RRuleGenerator['state']['data']['repeat']['yearly']['onThe'];
type allowBYSETPOS =
  RRuleGenerator['state']['data']['repeat']['yearly']['options']['allowBYSETPOS'];

import { MONTHS, DAYS } from 'ember-rrule-generator/utils/constants';

type Signature = BaseContainerSignature & {
  Args: {
    onThe: OnThe;
    allowBYSETPOS?: allowBYSETPOS;
  };
};

export default class ContainersRepeatYearlyOnTheComponent extends BaseContainerComponent<Signature> {
  YearlyOnTheMonth = YearlyOnTheMonth;
  YearlyOnTheDay = YearlyOnTheDay;
  YearlyOnTheWhich = YearlyOnTheWhich;

  get months() {
    return MONTHS.map((month) => {
      return {
        value: month,
        label: translateLabel(
          this.args.translations,
          `months.${month.toLowerCase()}`
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

  get days() {
    const filteredDays = DAYS.filter((d) => {
      if (d.match(/^week/i)) return this.args.allowBYSETPOS;
      return true;
    });
    return filteredDays.map((day) => {
      return {
        value: day,
        label: translateLabel(
          this.args.translations,
          `days.${day.toLowerCase().replace(/\s/g, '_')}`
        ),
      };
    });
  }
}
