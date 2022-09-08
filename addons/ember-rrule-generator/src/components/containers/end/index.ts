import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';

import type RRuleGenerator from '../../r-rule-generator/index';

import Select from './select';
import After from './after';
import OnDate from './on-date';

type End = RRuleGenerator['state']['data']['end'];

interface Signature {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    end: End;
  };
}

const isOptionAvailable = (
  option: keyof End['options']['modes'],
  options: End['options']
) => {
  return !options.modes || options.modes.indexOf(option) !== -1;
};

export default class ContainersEndIndexComponent extends Component<Signature> {
  Select = Select;
  OnDate = OnDate;
  After = After;

  get availableOptions() {
    const availableOptions: End['options']['modes'] = [];

    isOptionAvailable('Never', this.args.end.options) &&
      availableOptions.push('Never');
    isOptionAvailable('After', this.args.end.options) &&
      availableOptions.push('After');
    isOptionAvailable('On date', this.args.end.options) &&
      availableOptions.push('On date');

    return availableOptions;
  }

  isOptionSelected = helper(function ([mode, option]: [
    End['mode'],
    keyof End['options']['modes']
  ]) {
    return mode === option;
  });
}
