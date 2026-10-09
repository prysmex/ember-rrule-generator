import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { toPairs } from 'lodash-es';
import translateLabel from '../../../utils/translateLabel.js';
import ContainersRepeatWeeklyIntervalComponent from './weekly-interval.js';
import ContainersRepeatWeeklyDaysComponent from './weekly-days.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatYearlyOnMonthComponent extends BaseContainerComponent {
  WeeklyInterval = ContainersRepeatWeeklyIntervalComponent;
  WeeklyDays = ContainersRepeatWeeklyDaysComponent;
  get days() {
    let daysArray = toPairs(this.args.weekly.days);
    if (this.args.weekly.options.weekStartsOnSunday) {
      daysArray = daysArray.slice(-1).concat(daysArray.slice(0, -1));
    }
    return daysArray.map(dayArray => {
      return [{
        value: dayArray[0],
        label: translateLabel(this.args.translations, `days_short.${dayArray[0].toLowerCase()}`),
        isActive: dayArray[1]
      }, dayArray[1]];
    });
  }
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.weekly.label'),
      every: translateLabel(this.args.translations, 'repeat.weekly.every'),
      weeks: translateLabel(this.args.translations, 'repeat.weekly.weeks'),
      which: translateLabel(this.args.translations, 'repeat.weekly.weeks')
    };
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Interval=(component this.WeeklyInterval id=(concat @id \"-interval\") value=@weekly.interval handleChange=@handleChange name=(concat @name \".interval\") translations=@translations labels=this.labels isDisabled=@isDisabled) Days=(component this.WeeklyDays id=(concat @id \"-days\") days=this.days value=@weekly.days handleChange=@handleChange name=(concat @name \".days\") translations=@translations labels=this.labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=this.labels name=@name handleChange=@handleChange translations=@translations) as |Weekly|}}\n  {{#if (has-block)}}\n    {{yield Weekly}}\n  {{else}}\n    {{#let (component @view) as |WeeklyComponent|}}\n      <WeeklyComponent @Weekly={{Weekly}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatYearlyOnMonthComponent as default };
//# sourceMappingURL=weekly.js.map
