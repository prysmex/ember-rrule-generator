import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import { helper } from '@ember/component/helper';

import type RRuleGenerator from '../../r-rule-generator/index.gts';
import type { MonthlyMode } from '../../r-rule-generator/index.gts';
import translateLabel from '../../../utils/translateLabel.ts';

import MonthlyOn from './monthly-on.gts';
import MonthlyOnThe from './monthly-on-the.gts';
import MonthlySelectMode from './monthly-select-mode.gts';
import MonthlyInterval from './monthly-interval.gts';

type Monthly = RRuleGenerator['state']['data']['repeat']['monthly'];

type Signature = BaseContainerSignature & {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    monthly: Monthly;
  };
};

const isTheOnlyMode = (option: MonthlyMode, options: Monthly['options']) =>
  options.modes === option;

const isOptionAvailable = (
  option: MonthlyMode,
  options: Monthly['options'],
) => {
  return !options.modes || isTheOnlyMode(option, options);
};

export default class ContainersRepeatMonthlyComponent extends BaseContainerComponent<Signature> {
  MonthlySelectMode = MonthlySelectMode;
  MonthlyInterval = MonthlyInterval;
  MonthlyOn = MonthlyOn;
  MonthlyOnThe = MonthlyOnThe;

  isNotTheOnlyMode = helper(function ([option, options]: [
    MonthlyMode,
    Monthly['options'],
  ]) {
    return options.modes && !isTheOnlyMode(option, options);
  });

  isOptionAvailable = helper(function ([option, options]: [
    MonthlyMode,
    Monthly['options'],
  ]) {
    return isOptionAvailable(option, options);
  });

  isModeActive = helper(function ([mode, option]: [MonthlyMode, MonthlyMode]) {
    return mode === option;
  });

  get availableOptions() {
    const availableOptions: { value: string; label: string }[] = [];

    if (isOptionAvailable('on', this.args.monthly.options)) {
      availableOptions.push({ value: 'on', label: 'on' });
    }
    if (isOptionAvailable('on the', this.args.monthly.options)) {
      availableOptions.push({ value: 'on the', label: 'on the' });
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
      on_the: translateLabel(this.args.translations, 'repeat.monthly.on_the'),
    };
  }

  get allowBYSETPOS() {
    const { allowBYSETPOS } = this.args.monthly.options || {};
    return typeof allowBYSETPOS === 'undefined' ? true : allowBYSETPOS;
  }

  get negativeDaysQuantity() {
    const { negativeDaysQuantity } = this.args.monthly.options;
    return typeof negativeDaysQuantity === 'undefined'
      ? 3
      : negativeDaysQuantity;
  }

  <template>
    {{#let
      (hash
        Select=(component
          this.MonthlySelectMode
          id=(concat @id "-select")
          options=this.availableOptions
          value=@monthly.mode
          handleChange=@handleChange
          name=(concat @name ".mode")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        Interval=(component
          this.MonthlyInterval
          id=(concat @id "-interval")
          value=@monthly.interval
          handleChange=@handleChange
          name=(concat @name ".interval")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        On=(component
          this.MonthlyOn
          id=(concat @id "-on")
          mode=@monthly.mode
          on=@monthly.on
          hasMoreModes=(this.isNotTheOnlyMode "on" @monthly.options)
          handleChange=@handleChange
          isActive=(this.isModeActive @monthly.mode "on")
          name=(concat @name ".on")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
          negativeDaysQuantity=this.negativeDaysQuantity
        )
        OnThe=(component
          this.MonthlyOnThe
          id=(concat @id "-onThe")
          mode=@monthly.mode
          hasMoreModes=(this.isNotTheOnlyMode "on the" @monthly.options)
          onThe=@monthly.onThe
          handleChange=@handleChange
          isActive=(this.isModeActive @monthly.mode "on the")
          name=(concat @name ".onThe")
          translations=@translations
          labels=this.labels
          allowBYSETPOS=this.allowBYSETPOS
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
        allowBYSETPOS=this.allowBYSETPOS
        labels=this.labels
        name=@name
        translations=@translations
        isOnActive=(this.isModeActive @monthly.mode "on")
        isOnTheActive=(this.isModeActive @monthly.mode "on the")
      )
      as |MonthlyBase|
    }}
      {{#let MonthlyBase as |Monthly|}}
        {{#if (has-block)}}
          {{yield Monthly}}
        {{else}}
          {{#let (component @view) as |MonthlyComponent|}}
            <MonthlyComponent @Monthly={{Monthly}} ...attributes />
          {{/let}}
        {{/if}}
      {{/let}}
    {{/let}}
  </template>
}
