import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import { helper } from '@ember/component/helper';

import RRuleGenerator, { MonthlyMode } from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

import MonthlyOn from './monthly-on';
import MonthlyOnThe from './monthly-on-the';
import MonthlySelectMode from './monthly-select-mode';
import MonthlyInterval from './monthly-interval';

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
  options: Monthly['options']
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
    Monthly['options']
  ]) {
    return options.modes && !isTheOnlyMode(option, options);
  });

  isOptionAvailable = helper(function ([option, options]: [
    MonthlyMode,
    Monthly['options']
  ]) {
    return isOptionAvailable(option, options);
  });

  isModeActive = helper(function ([mode, option]: [MonthlyMode, MonthlyMode]) {
    return mode === option;
  });

  get availableOptions() {
    const availableOptions: { value: string; label: string }[] = [];

    isOptionAvailable('on', this.args.monthly.options) &&
      availableOptions.push({ value: 'on', label: 'on' });
    isOptionAvailable('on the', this.args.monthly.options) &&
      availableOptions.push({ value: 'on the', label: 'on the' });

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
}
