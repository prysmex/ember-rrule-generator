import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';
import { helper } from '@ember/component/helper';

import RRuleGenerator, { YearlyMode } from '../../r-rule-generator/index';

import YearlyInterval from './yearly-interval';
import YearlyOn from './yearly-on';
import YearlyOnThe from './yearly-on-the';
import YearlySelectMode from './yearly-select-mode';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type Yearly = RRuleGenerator['state']['data']['repeat']['yearly'];

type Signature = BaseContainerSignature & {
  Args: {
    yearly: Yearly;
  };
};

const isTheOnlyMode = (option: YearlyMode, options: Yearly['options']) =>
  options.modes === option;

const isOptionAvailable = (option: YearlyMode, options: Yearly['options']) => {
  return !options.modes || isTheOnlyMode(option, options);
};

export default class ContainersRepeatYearlyComponent extends BaseContainerComponent<Signature> {
  YearlyInterval = YearlyInterval;
  YearlyOn = YearlyOn;
  YearlyOnThe = YearlyOnThe;
  YearlySelectMode = YearlySelectMode;

  isNotTheOnlyMode = helper(function ([option, options]: [
    YearlyMode,
    Yearly['options']
  ]) {
    return options.modes && !isTheOnlyMode(option, options);
  });

  isOptionAvailable = helper(function ([option, options]: [
    YearlyMode,
    Yearly['options']
  ]) {
    return isOptionAvailable(option, options);
  });

  isModeActive = helper(function ([mode, option]: [YearlyMode, YearlyMode]) {
    return mode === option;
  });

  get availableOptions() {
    const availableOptions: { value: string; label: string | null }[] = [];

    isOptionAvailable('on', this.args.yearly.options) &&
      availableOptions.push({
        value: 'on',
        label: translateLabel(this.args.translations, 'repeat.yearly.on'),
      });
    isOptionAvailable('on the', this.args.yearly.options) &&
      availableOptions.push({
        value: 'on the',
        label: translateLabel(this.args.translations, 'repeat.yearly.on_the'),
      });

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
      of: translateLabel(this.args.translations, 'repeat.yearly.of'),
    };
  }

  get allowBYSETPOS() {
    const { allowBYSETPOS } = this.args.yearly.options || {};
    return typeof allowBYSETPOS === 'undefined' ? true : allowBYSETPOS;
  }

  get negativeDaysQuantity() {
    const { negativeDaysQuantity } = this.args.yearly.options;
    return typeof negativeDaysQuantity === 'undefined'
      ? 3
      : negativeDaysQuantity;
  }
}
