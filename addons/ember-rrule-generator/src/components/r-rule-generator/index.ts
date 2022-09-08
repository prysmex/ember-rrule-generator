import { cloneDeep, set } from 'lodash-es';

import Component from '@glimmer/component';
//@ts-expect-error
import { tracked } from '@glimmer/tracking';

import computeRRuleToString from '../../utils/computeRRule/toString/computeRRule';
// import computeRRuleFromString from '../../utils/computeRRule/fromString/computeRRule';
import configureInitialState from '../../utils/configureInitialState';

import Start from '../containers/start/index';
import End from '../containers/end/index';

export interface ChangeEvent {
  target: {
    value: unknown;
    name: string;
  };
}

export interface Config {
  frequency?: 'Yearly' | 'Monthy' | 'Weekly' | 'Daily' | 'Hourly'[];
  yearly?: 'on' | 'on the';
  monthly?: 'on' | 'on the';
  end?: 'Never' | 'After' | 'On date'[];
  hideStart?: boolean;
  hideEnd?: boolean;
  hideError?: boolean;
  weekStartsOnSunday?: boolean;
}

type Signature = {
  Element: HTMLUListElement;
  Args: {
    onChange: (rrule: string) => void;
    value?: string;
    config?: Config;
    id?: string;
  };
};

export default class RRuleGenerator extends Component<Signature> {
  Start = Start;
  End = End;

  @tracked state = configureInitialState(this.args.config, this.args.id);

  handleChange = ({ target }: ChangeEvent) => {
    //eslint-disable-next-line
    const newData = cloneDeep(this.state.data);
    //eslint-disable-next-line
    set(newData, target.name, target.value);

    this.state = {
      ...this.state,
      data: newData,
    };

    //eslint-disable-next-line
    const rrule = computeRRuleToString(newData);

    //eslint-disable-next-line
    console.log(rrule);

    this.args.onChange?.(rrule as string);
  };
}
