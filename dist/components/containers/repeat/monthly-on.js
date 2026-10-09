import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersRepeatMonthlyOnDayComponent from './monthly-on-day.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatMonthlyOnComponent extends BaseContainerComponent {
  MonthlyOnDay = ContainersRepeatMonthlyOnDayComponent;
  get days() {
    //eslint-disable-next-line
    const positive = [...new Array(31)].map((_day, i) => {
      return {
        value: i + 1,
        label: translateLabel(this.args.translations, `numerals_by_number.${i + 1}`)
      };
    });
    const neg = [...new Array(this.args.negativeDaysQuantity)].map((_day, i) => {
      return {
        value: (i + 1) * -1,
        label: translateLabel(this.args.translations, `numerals_by_number.${(i + 1) * -1}`)
      };
    });
    return [...positive, ...neg];
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Day=(component this.MonthlyOnDay id=(concat @id \"-day\") value=@on.day handleChange=@handleChange name=(concat @name \".day\") options=this.days isActive=@isActive translations=@translations labels=@labels isDisabled=@isDisabled) isDisabled=@isDisabled name=@name translations=@translations handleChange=@handleChange labels=@labels) as |On|}}\n\n  {{#if (has-block)}}\n    {{yield On}}\n  {{else}}\n    {{#let (component @view) as |MonthlyOnComponent|}}\n      <MonthlyOnComponent @On={{On}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatMonthlyOnComponent as default };
//# sourceMappingURL=monthly-on.js.map
