import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { helper } from '@ember/component/helper';
import translateLabel from '../../../utils/translateLabel.js';
import ContainersRepeatMonthlyOnComponent from './monthly-on.js';
import ContainersRepeatMonthlyOnTheComponent from './monthly-on-the.js';
import ContainersRepeatMonthlySelectModeComponent from './monthly-select-mode.js';
import ContainersRepeatMonthlyIntervalComponent from './monthly-interval.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const isTheOnlyMode = (option, options) => options.modes === option;
const isOptionAvailable = (option, options) => {
  return !options.modes || isTheOnlyMode(option, options);
};
class ContainersRepeatMonthlyComponent extends BaseContainerComponent {
  MonthlySelectMode = ContainersRepeatMonthlySelectModeComponent;
  MonthlyInterval = ContainersRepeatMonthlyIntervalComponent;
  MonthlyOn = ContainersRepeatMonthlyOnComponent;
  MonthlyOnThe = ContainersRepeatMonthlyOnTheComponent;
  isNotTheOnlyMode = helper(function ([option, options]) {
    return options.modes && !isTheOnlyMode(option, options);
  });
  isOptionAvailable = helper(function ([option, options]) {
    return isOptionAvailable(option, options);
  });
  isModeActive = helper(function ([mode, option]) {
    return mode === option;
  });
  get availableOptions() {
    const availableOptions = [];
    if (isOptionAvailable('on', this.args.monthly.options)) {
      availableOptions.push({
        value: 'on',
        label: 'on'
      });
    }
    if (isOptionAvailable('on the', this.args.monthly.options)) {
      availableOptions.push({
        value: 'on the',
        label: 'on the'
      });
    }
    return availableOptions;
  }
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.monthly.label'),
      every: translateLabel(this.args.translations, 'repeat.monthly.every'),
      months: translateLabel(this.args.translations, 'repeat.monthly.months'),
      which: translateLabel(this.args.translations, 'repeat.monthly.months'),
      on_day: translateLabel(this.args.translations, 'repeat.monthly.on_day'),
      on_the: translateLabel(this.args.translations, 'repeat.monthly.on_the')
    };
  }
  get allowBYSETPOS() {
    const {
      allowBYSETPOS
    } = this.args.monthly.options || {};
    return typeof allowBYSETPOS === 'undefined' ? true : allowBYSETPOS;
  }
  get negativeDaysQuantity() {
    const {
      negativeDaysQuantity
    } = this.args.monthly.options;
    return typeof negativeDaysQuantity === 'undefined' ? 3 : negativeDaysQuantity;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Select=(component this.MonthlySelectMode id=(concat @id \"-select\") options=this.availableOptions value=@monthly.mode handleChange=@handleChange name=(concat @name \".mode\") translations=@translations labels=this.labels isDisabled=@isDisabled) Interval=(component this.MonthlyInterval id=(concat @id \"-interval\") value=@monthly.interval handleChange=@handleChange name=(concat @name \".interval\") translations=@translations labels=this.labels isDisabled=@isDisabled) On=(component this.MonthlyOn id=(concat @id \"-on\") mode=@monthly.mode on=@monthly.on hasMoreModes=(this.isNotTheOnlyMode \"on\" @monthly.options) handleChange=@handleChange isActive=(this.isModeActive @monthly.mode \"on\") name=(concat @name \".on\") translations=@translations labels=this.labels isDisabled=@isDisabled negativeDaysQuantity=this.negativeDaysQuantity) OnThe=(component this.MonthlyOnThe id=(concat @id \"-onThe\") mode=@monthly.mode hasMoreModes=(this.isNotTheOnlyMode \"on the\" @monthly.options) onThe=@monthly.onThe handleChange=@handleChange isActive=(this.isModeActive @monthly.mode \"on the\") name=(concat @name \".onThe\") translations=@translations labels=this.labels allowBYSETPOS=this.allowBYSETPOS isDisabled=@isDisabled) isDisabled=@isDisabled allowBYSETPOS=this.allowBYSETPOS labels=this.labels name=@name translations=@translations isOnActive=(this.isModeActive @monthly.mode \"on\") isOnTheActive=(this.isModeActive @monthly.mode \"on the\")) as |MonthlyBase|}}\n  {{#let MonthlyBase as |Monthly|}}\n    {{#if (has-block)}}\n      {{yield Monthly}}\n    {{else}}\n      {{#let (component @view) as |MonthlyComponent|}}\n        <MonthlyComponent @Monthly={{Monthly}} ...attributes />\n      {{/let}}\n    {{/if}}\n  {{/let}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatMonthlyComponent as default };
//# sourceMappingURL=monthly.js.map
