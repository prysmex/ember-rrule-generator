import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersRepeatMonthlyOnTheDayComponent from './monthly-on-the-day.js';
import ContainersRepeatMonthlyOnTheWhichComponent from './monthly-on-the-which.js';
import translateLabel from '../../../utils/translateLabel.js';
import { DAYS } from '../../../utils/constants.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatMonthlyOnTheComponent extends BaseContainerComponent {
  MonthlyOnTheDay = ContainersRepeatMonthlyOnTheDayComponent;
  MonthlyOnTheWhich = ContainersRepeatMonthlyOnTheWhichComponent;
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
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Which=(component this.MonthlyOnTheWhich id=(concat @id \"-which\") value=@onThe.which handleChange=@handleChange name=(concat @name \".which\") options=this.whichs isActive=@isActive translations=@translations labels=@labels isDisabled=@isDisabled) Day=(component this.MonthlyOnTheDay id=(concat @id \"-day\") value=@onThe.day handleChange=@handleChange name=(concat @name \".day\") options=this.days isActive=@isActive translations=@translations labels=@labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=@labels name=@name handleChange=@handleChange translations=@translations) as |OnThe|}}\n  {{#if (has-block)}}\n    {{yield OnThe}}\n  {{else}}\n    {{#let (component @view) as |MonthlyOnTheComponent|}}\n      <MonthlyOnTheComponent @OnThe={{OnThe}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatMonthlyOnTheComponent as default };
//# sourceMappingURL=monthly-on-the.js.map
