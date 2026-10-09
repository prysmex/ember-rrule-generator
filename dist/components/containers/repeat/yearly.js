import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { helper } from '@ember/component/helper';
import ContainersRepeatYearlyIntervalComponent from './yearly-interval.js';
import ContainersRepeatYearlyOnComponent from './yearly-on.js';
import ContainersRepeatYearlyOnTheComponent from './yearly-on-the.js';
import ContainersRepeatYearlySelectModeComponent from './yearly-select-mode.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const isTheOnlyMode = (option, options) => options.modes === option;
const isOptionAvailable = (option, options) => {
  return !options.modes || isTheOnlyMode(option, options);
};
class ContainersRepeatYearlyComponent extends BaseContainerComponent {
  YearlyInterval = ContainersRepeatYearlyIntervalComponent;
  YearlyOn = ContainersRepeatYearlyOnComponent;
  YearlyOnThe = ContainersRepeatYearlyOnTheComponent;
  YearlySelectMode = ContainersRepeatYearlySelectModeComponent;
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
    if (isOptionAvailable('on', this.args.yearly.options)) {
      availableOptions.push({
        value: 'on',
        label: translateLabel(this.args.translations, 'repeat.yearly.on')
      });
    }
    if (isOptionAvailable('on the', this.args.yearly.options)) {
      availableOptions.push({
        value: 'on the',
        label: translateLabel(this.args.translations, 'repeat.yearly.on_the')
      });
    }
    return availableOptions;
  }
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.yearly.label'),
      every: translateLabel(this.args.translations, 'repeat.yearly.every'),
      years: translateLabel(this.args.translations, 'repeat.yearly.years'),
      which: translateLabel(this.args.translations, 'repeat.yearly.years'),
      on: translateLabel(this.args.translations, 'repeat.yearly.on'),
      on_the: translateLabel(this.args.translations, 'repeat.yearly.on_the'),
      of: translateLabel(this.args.translations, 'repeat.yearly.of')
    };
  }
  get allowBYSETPOS() {
    const {
      allowBYSETPOS
    } = this.args.yearly.options || {};
    return typeof allowBYSETPOS === 'undefined' ? true : allowBYSETPOS;
  }
  get negativeDaysQuantity() {
    const {
      negativeDaysQuantity
    } = this.args.yearly.options;
    return typeof negativeDaysQuantity === 'undefined' ? 3 : negativeDaysQuantity;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Select=(component this.YearlySelectMode id=(concat @id \"-select\") options=this.availableOptions value=@yearly.mode handleChange=@handleChange name=(concat @name \".mode\") translations=@translations labels=this.labels isDisabled=@isDisabled) Interval=(component this.YearlyInterval id=(concat @id \"-interval\") value=@yearly.interval handleChange=@handleChange name=(concat @name \".interval\") translations=@translations labels=this.labels isDisabled=@isDisabled) On=(component this.YearlyOn id=(concat @id \"-on\") mode=@yearly.mode on=@yearly.on hasMoreModes=(this.isNotTheOnlyMode \"on\" @yearly.options) handleChange=@handleChange isActive=(this.isModeActive @yearly.mode \"on\" @yearly.options) name=(concat @name \".on\") translations=@translations labels=this.labels allowBYSETPOS=this.allowBYSETPOS negativeDaysQuantity=this.negativeDaysQuantity isDisabled=@isDisabled) OnThe=(component this.YearlyOnThe id=(concat @id \"-onThe\") mode=@yearly.mode hasMoreModes=(this.isNotTheOnlyMode \"on the\" @yearly.options) onThe=@yearly.onThe handleChange=@handleChange isActive=(this.isModeActive @yearly.mode \"on the\") name=(concat @name \".onThe\") translations=@translations labels=this.labels allowBYSETPOS=this.allowBYSETPOS isDisabled=@isDisabled) isDisabled=@isDisabled labels=this.labels name=@name translations=@translations handleChange=@handleChange allowBYSETPOS=this.allowBYSETPOS isOnActive=(this.isModeActive @yearly.mode \"on\") isOnTheActive=(this.isModeActive @yearly.mode \"on the\")) as |Yearly|}}\n  {{#if (has-block)}}\n    {{yield Yearly}}\n  {{else}}\n    {{#let (component @view) as |YearlyComponent|}}\n      <YearlyComponent @Yearly={{Yearly}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatYearlyComponent as default };
//# sourceMappingURL=yearly.js.map
