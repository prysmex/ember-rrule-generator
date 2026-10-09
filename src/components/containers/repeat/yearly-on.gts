import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import YearlyOnMonth from './yearly-on-month.gts';
import YearlyOnDay from './yearly-on-day.gts';
import type RRuleGenerator from '../../r-rule-generator/index.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type On = RRuleGenerator['state']['data']['repeat']['yearly']['on'];

import { MONTHS } from '../../../utils/constants.js';

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
          `months.${month.toLowerCase()}`,
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
          `numerals_by_number.${i + 1}`,
        ),
      };
    });

    const neg = [...new Array(this.args.negativeDaysQuantity)].map(
      (_day, i) => {
        return {
          value: (i + 1) * -1,
          label: translateLabel(
            this.args.translations,
            `numerals_by_number.${(i + 1) * -1}`,
          ),
        };
      },
    );
    return [...positive, ...neg];
  }

  <template>
    {{#let
      (hash
        Month=(component
          this.YearlyOnMonth
          id=(concat @id "-month")
          value=@on.month
          handleChange=@handleChange
          name=(concat @name ".month")
          options=this.months
          isActive=@isActive
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
        )
        Day=(component
          this.YearlyOnDay
          id=(concat @id "-day")
          value=@on.day
          handleChange=@handleChange
          name=(concat @name ".day")
          options=this.days
          isActive=@isActive
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
        labels=@labels
        name=@name
        translations=@translations
        handleChange=@handleChange
      )
      as |On|
    }}

      {{#if (has-block)}}

        {{yield On}}
      {{else}}
        {{#let (component @view) as |YearlyOnComponent|}}
          <YearlyOnComponent @On={{On}} ...attributes />
        {{/let}}
      {{/if}}

    {{/let}}
  </template>
}
