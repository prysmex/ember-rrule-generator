import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import MonthlyOnTheDay from './monthly-on-the-day';
import MonthlyOnTheWhich from './monthly-on-the-which';

import type RRuleGenerator from '../../r-rule-generator/index';

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
        label: day,
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
}
