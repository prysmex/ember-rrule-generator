import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import MonthlyOnDay from './monthly-on-day';

import type RRuleGenerator from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type On = RRuleGenerator['state']['data']['repeat']['monthly']['on'];

type Signature = BaseContainerSignature & {
  Args: {
    on: On;
    negativeDaysQuantity: RRuleGenerator['state']['data']['repeat']['monthly']['options']['negativeDaysQuantity'];
  };
};

export default class ContainersRepeatMonthlyOnComponent extends BaseContainerComponent<Signature> {
  MonthlyOnDay = MonthlyOnDay;

  get days() {
    //eslint-disable-next-line
    const positive = [...new Array(31)].map((_day, i) => {
      return {
        value: i + 1,
        label: translateLabel(
          this.args.translations,
          `numerals_by_number.${i + 1}`
        ),
      };
    });

    const neg = [...new Array(this.args.negativeDaysQuantity)].map(
      (_day, i) => {
        return {
          value: (i + 1) * -1,
          label: translateLabel(
            this.args.translations,
            `numerals_by_number.${(i + 1) * -1}`
          ),
        };
      }
    );

    return [...positive, ...neg];
  }
}
