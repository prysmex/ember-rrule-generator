import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';

import RRuleGenerator, { EndValue } from '../../r-rule-generator/index';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

import SelectMode from './select-mode';
import After from './after';
import OnDate from './on-date';

type End = RRuleGenerator['state']['data']['end'];

interface Signature {
  Args: {
    handleChange: RRuleGenerator['handleChange'];
    translations: RRuleGenerator['translations'];
    end: End;
  };
}

const isOptionAvailable = (option: EndValue, options: End['options']) => {
  return !options.modes || options.modes.indexOf(option) !== -1;
};

export default class ContainersEndIndexComponent extends Component<Signature> {
  SelectMode = SelectMode;
  OnDate = OnDate;
  After = After;

  get availableOptions() {
    const availableOptions: {
      value: EndValue;
      label: string | null;
    }[] = [];

    isOptionAvailable('Never', this.args.end.options) &&
      availableOptions.push({
        value: 'Never',
        label: translateLabel(this.args.translations, 'end.never'),
      });
    isOptionAvailable('After', this.args.end.options) &&
      availableOptions.push({
        value: 'After',
        label: translateLabel(this.args.translations, 'end.after'),
      });
    isOptionAvailable('On date', this.args.end.options) &&
      availableOptions.push({
        value: 'On date',
        label: translateLabel(this.args.translations, 'end.on_date'),
      });

    return availableOptions;
  }

  isOptionSelected = helper(function ([mode, option]: [
    End['mode'],
    keyof End['options']['modes']
  ]) {
    return mode === option;
  });
}
