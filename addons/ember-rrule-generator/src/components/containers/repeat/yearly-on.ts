import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import YearlyOnMonth from './yearly-on-month';
import YearlyOnDay from './yearly-on-day';
import type RRuleGenerator from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type On = RRuleGenerator['state']['data']['repeat']['yearly']['on'];

import { MONTHS } from 'ember-rrule-generator/utils/constants';

type Signature = BaseContainerSignature & {
  Args: {
    on: On;
    negativeDaysQuantity: RRuleGenerator['state']['data']['repeat']['yearly']['options']['negativeDaysQuantity'];
  };
};

export default class ContainersRepeatYearlyOnComponent extends BaseContainerComponent<Signature> {
  YearlyOnMonth = YearlyOnMonth;
  YearlyOnDay = YearlyOnDay;

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
