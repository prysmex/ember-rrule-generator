import BaseHandlerComponent, { BaseHandlerSignature } from '../base-handler';

import type RRuleGenerator from '../../r-rule-generator/index';

import { helper } from '@ember/component/helper';

import SelectFrequency from './select-frequency';
import RepeatYearly from './yearly';
import RepeatMonthly from './monthly';
import RepeatWeekly from './weekly';
import RepeatDaily from './daily';
import RepeatHourly from './hourly';

type Repeat = RRuleGenerator['state']['data']['repeat'];

type Signature = BaseHandlerSignature & {
  Args: {
    repeat: Repeat;
  };
};

const isOptionAvailable = (
  option: keyof Repeat['options']['frequency'],
  options: Repeat['options']['frequency']
) => {
  return (
    !options.frequency ||
    (options.frequency as string[]).indexOf(option as string) !== -1
  );
};

export default class ContainersRepeatComponent extends BaseHandlerComponent<Signature> {
  SelectFrequency = SelectFrequency;
  RepeatYearly = RepeatYearly;
  RepeatMonthly = RepeatMonthly;
  RepeatWeekly = RepeatWeekly;
  RepeatDaily = RepeatDaily;
  RepeatHourly = RepeatHourly;

  get availableOptions() {
    const availableOptions: Repeat['options']['frequency'] = [];

    isOptionAvailable('Yearly', this.args.repeat.options) &&
      availableOptions.push('Yearly');
    isOptionAvailable('Monthly', this.args.repeat.options) &&
      availableOptions.push('Monthly');
    isOptionAvailable('Weekly', this.args.repeat.options) &&
      availableOptions.push('Weekly');
    isOptionAvailable('Daily', this.args.repeat.options) &&
      availableOptions.push('Daily');
    isOptionAvailable('Hourly', this.args.repeat.options) &&
      availableOptions.push('Hourly');

    return availableOptions;
  }

  isOptionSelected = helper(function ([frequency, option]: [
    Repeat['frequency'],
    keyof Repeat['options']['frequency']
  ]) {
    return frequency === option;
  });
}
