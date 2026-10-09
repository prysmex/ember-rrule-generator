import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersRepeatYearlyOnMonthComponent from './yearly-on-month.js';
import ContainersRepeatYearlyOnDayComponent from './yearly-on-day.js';
import translateLabel from '../../../utils/translateLabel.js';
import { MONTHS } from '../../../utils/constants.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatYearlyOnComponent extends BaseContainerComponent {
  YearlyOnMonth = ContainersRepeatYearlyOnMonthComponent;
  YearlyOnDay = ContainersRepeatYearlyOnDayComponent;
  get months() {
    return MONTHS.map(month => {
      return {
        value: month,
        label: translateLabel(this.args.translations, `months.${month.toLowerCase()}`)
      };
    });
  }
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
    setComponentTemplate(precompileTemplate("{{#let (hash Month=(component this.YearlyOnMonth id=(concat @id \"-month\") value=@on.month handleChange=@handleChange name=(concat @name \".month\") options=this.months isActive=@isActive translations=@translations labels=@labels isDisabled=@isDisabled) Day=(component this.YearlyOnDay id=(concat @id \"-day\") value=@on.day handleChange=@handleChange name=(concat @name \".day\") options=this.days isActive=@isActive translations=@translations labels=@labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=@labels name=@name translations=@translations handleChange=@handleChange) as |On|}}\n\n  {{#if (has-block)}}\n\n    {{yield On}}\n  {{else}}\n    {{#let (component @view) as |YearlyOnComponent|}}\n      <YearlyOnComponent @On={{On}} ...attributes />\n    {{/let}}\n  {{/if}}\n\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatYearlyOnComponent as default };
//# sourceMappingURL=yearly-on.js.map
