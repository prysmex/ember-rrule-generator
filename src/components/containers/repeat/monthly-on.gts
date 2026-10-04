import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import MonthlyOnDay from './monthly-on-day.gts';

import type RRuleGenerator from '../../r-rule-generator/index.gts';
import translateLabel from '../../../utils/translateLabel.ts';

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
        Day=(component
          this.MonthlyOnDay
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
        name=@name
        translations=@translations
        handleChange=@handleChange
        labels=@labels
      )
      as |On|
    }}

      {{#if (has-block)}}
        {{yield On}}
      {{else}}
        {{#let (component @view) as |MonthlyOnComponent|}}
          <MonthlyOnComponent @On={{On}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
