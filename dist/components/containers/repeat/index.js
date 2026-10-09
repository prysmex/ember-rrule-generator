import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { helper } from '@ember/component/helper';
import ContainersRepeatSelectFrequencyComponent from './select-frequency.js';
import ContainersRepeatYearlyComponent from './yearly.js';
import ContainersRepeatMonthlyComponent from './monthly.js';
import ContainersRepeatYearlyOnMonthComponent from './weekly.js';
import ContainersRepeatDailyComponent from './daily.js';
import ContainersRepeatHourlyComponent from './hourly.js';
import ContainersRepeatDailyComponent$1 from './minutely.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const isOptionAvailable = (option, options) => {
  return !options?.frequency || (options?.frequency).indexOf(option) !== -1;
};
class ContainersRepeatComponent extends BaseContainerComponent {
  SelectFrequency = ContainersRepeatSelectFrequencyComponent;
  RepeatYearly = ContainersRepeatYearlyComponent;
  RepeatMonthly = ContainersRepeatMonthlyComponent;
  RepeatWeekly = ContainersRepeatYearlyOnMonthComponent;
  RepeatDaily = ContainersRepeatDailyComponent;
  RepeatHourly = ContainersRepeatHourlyComponent;
  RepeatMinutely = ContainersRepeatDailyComponent$1;
  get availableOptions() {
    const availableOptions = [];
    if (isOptionAvailable('Yearly', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Yearly',
        label: translateLabel(this.args.translations, 'repeat.yearly.label')
      });
    }
    if (isOptionAvailable('Monthly', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Monthly',
        label: translateLabel(this.args.translations, 'repeat.monthly.label')
      });
    }
    if (isOptionAvailable('Weekly', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Weekly',
        label: translateLabel(this.args.translations, 'repeat.weekly.label')
      });
    }
    if (isOptionAvailable('Daily', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Daily',
        label: translateLabel(this.args.translations, 'repeat.daily.label')
      });
    }
    if (isOptionAvailable('Hourly', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Hourly',
        label: translateLabel(this.args.translations, 'repeat.hourly.label')
      });
    }
    if (isOptionAvailable('Minutely', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Minutely',
        label: translateLabel(this.args.translations, 'repeat.minutely.label')
      });
    }
    return availableOptions;
  }
  isOptionSelected = helper(function ([option, frequency]) {
    return frequency === option;
  });
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.label')
    };
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Select=(component this.SelectFrequency id=(concat @id \"-select\") options=this.availableOptions value=@repeat.frequency handleChange=@handleChange name=(concat @name \".frequency\") translations=@translations labels=this.labels isDisabled=@isDisabled) Yearly=(component this.RepeatYearly id=(concat @id \"-yearly\") yearly=@repeat.yearly name=(concat @name \".yearly\") handleChange=@handleChange translations=@translations labels=this.labels isDisabled=@isDisabled) Monthly=(component this.RepeatMonthly id=(concat @id \"-monthly\") monthly=@repeat.monthly name=(concat @name \".monthly\") handleChange=@handleChange translations=@translations labels=this.labels isDisabled=@isDisabled) Weekly=(component this.RepeatWeekly id=(concat @id \"-weekly\") weekly=@repeat.weekly name=(concat @name \".weekly\") handleChange=@handleChange translations=@translations labels=this.labels isDisabled=@isDisabled) Daily=(component this.RepeatDaily id=(concat @id \"-daily\") daily=@repeat.daily name=(concat @name \".daily\") handleChange=@handleChange translations=@translations labels=this.labels isDisabled=@isDisabled) Hourly=(component this.RepeatHourly id=(concat @id \"-hourly\") hourly=@repeat.hourly name=(concat @name \".hourly\") handleChange=@handleChange translations=@translations labels=this.labels isDisabled=@isDisabled) Minutely=(component this.RepeatMinutely id=(concat @id \"-minutely\") minutely=@repeat.minutely name=(concat @name \".minutely\") handleChange=@handleChange translations=@translations labels=this.labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=this.labels isYearlyActive=(this.isOptionSelected \"Yearly\" @repeat.frequency) isMonthlyActive=(this.isOptionSelected \"Monthly\" @repeat.frequency) isWeeklyActive=(this.isOptionSelected \"Weekly\" @repeat.frequency) isDailyActive=(this.isOptionSelected \"Daily\" @repeat.frequency) isHourlyActive=(this.isOptionSelected \"Hourly\" @repeat.frequency) isMinutelyActive=(this.isOptionSelected \"Minutely\" @repeat.frequency) handleChange=@handleChange name=@name translations=@translations) as |Repeat|}}\n  {{#if (has-block)}}\n    {{yield Repeat}}\n  {{else}}\n    {{#let (component @view) as |RepeatComponent|}}\n      <RepeatComponent @Repeat={{Repeat}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatComponent as default };
//# sourceMappingURL=index.js.map
