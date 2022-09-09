import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import YearlyOnTheMonth from './yearly-on-the-month';
import YearlyOnTheDay from './yearly-on-the-day';
import YearlyOnTheWhich from './yearly-on-the-which';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type RRuleGenerator from '../../r-rule-generator/index';

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
        label: month,
      };
    });
  }

  get whichs() {
    return [
      {
        value: 'First',
        label: 'First',
      },
      {
        value: 'Second',
        label: 'Second',
      },
      {
        value: 'Third',
        label: 'Third',
      },
      {
        value: 'Fourth',
        label: 'Fourth',
      },
      {
        value: 'Last',
        label: 'Last',
      },
    ];
  }

  get days() {
    return DAYS.map((day) => {
      return {
        value: day,
        label: day,
      };
    });
  }
}
