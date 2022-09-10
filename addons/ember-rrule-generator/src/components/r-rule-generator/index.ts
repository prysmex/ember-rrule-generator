import { cloneDeep, set } from 'lodash-es';

import Component from '@glimmer/component';
//@ts-expect-error
import { tracked } from '@glimmer/tracking';

import computeRRuleToString from 'ember-rrule-generator/utils/computeRRule/toString/computeRRule';
// import computeRRuleFromString from '../../utils/computeRRule/fromString/computeRRule';
import configureInitialState from 'ember-rrule-generator/utils/configureInitialState';

import Start from '../containers/start/index';
import End from '../containers/end/index';
import Repeat from '../containers/repeat/index';

import EN from '../../translations/en';
import { Translations } from 'ember-rrule-generator/utils/translateLabel';

export interface ChangeEvent {
  target: {
    value: unknown;
    name: string;
  };
}

export type EndValue = 'Never' | 'After' | 'On date';
export type FrequencyValue =
  | 'Yearly'
  | 'Monthly'
  | 'Weekly'
  | 'Daily'
  | 'Hourly';
export type MonthlyMode = 'on' | 'on the';
export type YearlyMode = 'on' | 'on the';

export interface Config {
  frequency?: Array<FrequencyValue>;
  yearly?: YearlyMode;
  monthly?: MonthlyMode;
  end?: Array<EndValue>;
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
    translations?: Translations;
  };
};

export default class RRuleGenerator extends Component<Signature> {
  Start = Start;
  End = End;
  Repeat = Repeat;

  //eslint-disable-next-line
  @tracked state = configureInitialState(this.args.config, this.args.id);

  get translations() {
    return (this.args.translations || EN) as Translations;
  }

  handleChange = ({ target }: ChangeEvent) => {
    //eslint-disable-next-line
    const newData = cloneDeep(this.state.data);
    //eslint-disable-next-line
    set(newData, target.name, target.value);
    //eslint-disable-next-line
    this.state = {
      ...this.state,
      //eslint-disable-next-line
      data: newData,
    };

    //eslint-disable-next-line
    const rrule = computeRRuleToString(newData);

    //eslint-disable-next-line
    console.log(rrule);

    this.args.onChange?.(rrule as string);
  };

  get showStart() {
    return this.args.config?.hideStart !== true;
  }

  get showEnd() {
    return this.args.config?.hideEnd !== true;
  }
}
