import { cloneDeep, set } from 'lodash-es';

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import computeRRuleToString from '../../utils/computeRRule/toString/computeRRule';
import computeRRuleFromString from '../../utils/computeRRule/fromString/computeRRule';
import configureInitialState from '../../utils/configureInitialState';

import Start from '../containers/start/index';

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
  weekStartOnSunday?: boolean;
}

type Signature = {
  Element: HTMLUListElement;
  Args: {
    onChange: (rrule: string) => void;
    value?: string;
    config?: Config;
    id?: string;
    calendarComponent?: Component;
  };
};

interface State {
  id: string;
  data: {
    start: unknown;
    repeat: unknown;
    end: unknown;
    options: unknown;
  };
  rrule: string;
}

export default class RRuleGenerator extends Component<Signature> {
  Start = Start;

  @tracked state: State = configureInitialState(
    this.args.config,
    this.args.calendarComponent,
    this.args.id
  );

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
    console.log(rrule);

    this.args.onChange?.(rrule);
  };
}
