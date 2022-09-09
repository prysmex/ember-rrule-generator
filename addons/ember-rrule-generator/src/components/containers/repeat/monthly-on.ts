import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import MonthlyOnDay from './monthly-on-day';

import type RRuleGenerator from '../../r-rule-generator/index';

type On = RRuleGenerator['state']['data']['repeat']['monthly']['on'];

type Signature = BaseContainerSignature & {
  Args: {
    on: On;
  };
};

export default class ContainersRepeatMonthlyOnComponent extends BaseContainerComponent<Signature> {
  MonthlyOnDay = MonthlyOnDay;

  get days() {
    //eslint-disable-next-line
    return [...new Array(31)].map((_day, i) => {
      return {
        value: i + 1,
        label: i + 1,
      };
    });
  }
}
