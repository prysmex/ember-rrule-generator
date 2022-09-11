import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import YearlyOnTheMonth from './yearly-on-the-month';
import YearlyOnTheDay from './yearly-on-the-day';
import YearlyOnTheWhich from './yearly-on-the-which';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type RRuleGenerator from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type OnThe = RRuleGenerator['state']['data']['repeat']['yearly']['onThe'];

//eslint-disable-next-line
dayjs.extend(customParseFormat);

import { MONTHS, DAYS } from 'ember-rrule-generator/utils/constants';

type Signature = BaseContainerSignature & {
  Args: {
    onThe: OnThe;
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

  get label() {
    return translateLabel(this.args.translations, 'repeat.yearly.on_the');
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
    return DAYS.map((day) => {
      return {
        value: day,
        label: translateLabel(
          this.args.translations,
          `day.${day.toLowerCase()}`
        ),
      };
    });
  }
}
