import Component from '@glimmer/component';
import { helper } from '@ember/component/helper';

import type RRuleGenerator from '../../r-rule-generator/index';

import YearlyInterval from './yearly-interval';
import YearlyOn from './yearly-on';
import YearlyOnThe from './yearly-on-the';
import YearlySelectMode from './yearly-select-mode';
import { merge } from 'lodash-es';

type Yearly = RRuleGenerator['state']['data']['repeat']['yearly'];

interface Signature {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    yearly: Yearly;
  };
}

const isTheOnlyMode = (
  option: keyof Yearly['options']['modes'],
  options: Yearly['options']
) => options.modes === option;

const isOptionAvailable = (
  option: keyof Yearly['options']['modes'],
  options: Yearly['options']
) => {
  return !options.modes || isTheOnlyMode(option, options);
};

export default class ContainersRepeatYearlyComponent extends Component<Signature> {
  YearlyInterval = YearlyInterval;
  YearlyOn = YearlyOn;
  YearlyOnThe = YearlyOnThe;
  YearlySelectMode = YearlySelectMode;

  isNotTheOnlyMode = helper(function ([option, options]: [
    keyof Yearly['options']['modes'],
    Yearly['options']
  ]) {
    return !isTheOnlyMode(option, options);
  });

  isOptionAvailable = helper(function ([option, options]: [
    keyof Yearly['options']['modes'],
    Yearly['options']
  ]) {
    return isOptionAvailable(option, options);
  });

  isModeActive = helper(function ([mode, option]: [
    keyof Yearly['options']['modes'],
    keyof Yearly['options']['modes']
  ]) {
    return mode === option;
  });

  merge = helper(function ([T, ...O]: [unknown, unknown]) {
    return merge({}, T, ...O);
  });

  get availableOptions() {
    const availableOptions: { value: string; label: string }[] = [];

    isOptionAvailable('on', this.args.yearly.options) &&
      availableOptions.push({ value: 'on', label: 'on' });
    isOptionAvailable('on the', this.args.yearly.options) &&
      availableOptions.push({ value: 'on the', label: 'on the' });

    return availableOptions;
  }
}
