import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersRepeatYearlyOnTheMonthComponent from './yearly-on-the-month.js';
import ContainersRepeatYearlyOnTheMonthComponent$1 from './yearly-on-the-day.js';
import ContainersRepeatYearlyOnTheWhichComponent from './yearly-on-the-which.js';
import translateLabel from '../../../utils/translateLabel.js';
import { MONTHS, DAYS } from '../../../utils/constants.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatYearlyOnTheComponent extends BaseContainerComponent {
  YearlyOnTheMonth = ContainersRepeatYearlyOnTheMonthComponent;
  YearlyOnTheDay = ContainersRepeatYearlyOnTheMonthComponent$1;
  YearlyOnTheWhich = ContainersRepeatYearlyOnTheWhichComponent;
  get months() {
    return MONTHS.map(month => {
      return {
        value: month,
        label: translateLabel(this.args.translations, `months.${month.toLowerCase()}`)
      };
    });
  }
  get whichs() {
    return [{
      value: 'First',
      label: translateLabel(this.args.translations, 'numerals.first')
    }, {
      value: 'Second',
      label: translateLabel(this.args.translations, 'numerals.second')
    }, {
      value: 'Third',
      label: translateLabel(this.args.translations, 'numerals.third')
    }, {
      value: 'Fourth',
      label: translateLabel(this.args.translations, 'numerals.fourth')
    }, {
      value: 'Last',
      label: translateLabel(this.args.translations, 'numerals.last')
    }];
  }
  get days() {
    const filteredDays = DAYS.filter(d => {
      if (d.match(/^week/i)) return this.args.allowBYSETPOS;
      return true;
    });
    return filteredDays.map(day => {
      return {
        value: day,
        label: translateLabel(this.args.translations, `days.${day.toLowerCase().replace(/\s/g, '_')}`)
      };
    });
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Which=(component this.YearlyOnTheWhich id=(concat @id \"-which\") value=@onThe.which handleChange=@handleChange name=(concat @name \".which\") options=this.whichs isActive=@isActive translations=@translations labels=@labels isDisabled=@isDisabled) Month=(component this.YearlyOnTheMonth id=(concat @id \"-month\") value=@onThe.month handleChange=@handleChange name=(concat @name \".month\") options=this.months isActive=@isActive translations=@translations labels=@labels isDisabled=@isDisabled) Day=(component this.YearlyOnTheDay id=(concat @id \"-day\") value=@onThe.day handleChange=@handleChange name=(concat @name \".day\") options=this.days isActive=@isActive translations=@translations labels=@labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=@labels name=@name translations=@translations handleChange=@handleChange) as |OnThe|}}\n  {{#if (has-block)}}\n    {{yield OnThe}}\n  {{else}}\n    {{#let (component @view) as |YearlyOnTheComponent|}}\n      <YearlyOnTheComponent @OnThe={{OnThe}} ...attributes />\n    {{/let}}\n  {{/if}}\n\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatYearlyOnTheComponent as default };
//# sourceMappingURL=yearly-on-the.js.map
