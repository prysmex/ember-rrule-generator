import Component from '@glimmer/component';
import { helper } from '@ember/component/helper';

import RRuleGenerator, { MonthlyMode } from '../../r-rule-generator/index';

import MonthlyOn from './monthly-on';
import MonthlyOnThe from './monthly-on-the';
import MonthlySelectMode from './monthly-select-mode';
import MonthlyInterval from './monthly-interval';
import { merge } from 'lodash-es';

type Monthly = RRuleGenerator['state']['data']['repeat']['monthly'];

interface Signature {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    monthly: Monthly;
  };
}

const isTheOnlyMode = (option: MonthlyMode, options: Monthly['options']) =>
  options.modes === option;

const isOptionAvailable = (
  option: MonthlyMode,
  options: Monthly['options']
) => {
  return !options.modes || isTheOnlyMode(option, options);
};

export default class ContainersRepeatMonthlyComponent extends Component<Signature> {
  MonthlySelectMode = MonthlySelectMode;
  MonthlyInterval = MonthlyInterval;
  MonthlyOn = MonthlyOn;
  MonthlyOnThe = MonthlyOnThe;

  isNotTheOnlyMode = helper(function ([option, options]: [
    MonthlyMode,
    Monthly['options']
  ]) {
    return !isTheOnlyMode(option, options);
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

  merge = helper(function ([T, ...O]: [unknown, unknown]) {
    return merge({}, T, ...O);
  });

  get availableOptions() {
    const availableOptions: { value: string; label: string }[] = [];

    isOptionAvailable('on', this.args.monthly.options) &&
      availableOptions.push({ value: 'on', label: 'on' });
    isOptionAvailable('on the', this.args.monthly.options) &&
      availableOptions.push({ value: 'on the', label: 'on the' });

    return availableOptions;
  }
}
