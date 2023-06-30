import { cloneDeep, set } from 'lodash-es';

import Component from '@glimmer/component';

import computeRRuleToString from 'ember-rrule-generator/utils/computeRRule/toString/computeRRule';
import computeRRuleFromString from 'ember-rrule-generator/utils/computeRRule/fromString/computeRRule';
import configureInitialState from 'ember-rrule-generator/utils/configureInitialState';

import Start from 'ember-rrule-generator/components/containers/start/index';
import End from 'ember-rrule-generator/components/containers/end/index';
import Repeat from 'ember-rrule-generator/components/containers/repeat/index';
import Timezone from 'ember-rrule-generator/components/containers/timezone/index';

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
  | 'Hourly'
  | 'Minutely';

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
  allowBYSETPOS?: boolean;
  negativeDaysQuantity?: boolean;
  supportedTimezones?: () => string[];
  tzid?: string;
}

type Signature = {
  Args: {
    onChange: (rrule: string) => void;
    value?: string;
    config?: Config;
    id?: string;
    translations?: Translations;
  };
};

type TheState = ReturnType<typeof configureInitialState>;

class State {
  id: TheState['id'];
  data: TheState['data'];
  rrule: TheState['rrule'];

  constructor(s: TheState) {
    this.id = s.id;
    this.data = s.data;
    this.rrule = s.rrule;
  }
}
export default class RRuleGenerator extends Component<Signature> {
  Start = Start;
  End = End;
  Repeat = Repeat;
  Timezone = Timezone;

  _lastStateValue: State;

  _lastValue;

  get state() {
    const newState = new State({
      ...this._lastStateValue,
      data: computeRRuleFromString(
        this._lastStateValue.data,
        this.args.value
      ) as State['data'],
    });
    //eslint-disable-next-line
    this._lastStateValue = newState;
    return newState;
  }

  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);

    const state = new State(
      configureInitialState(this.args.config, this.args.id)
    );

    if (this.args.value) {
      const data = computeRRuleFromString(
        state.data,
        this.args.value
      ) as State['data'];

      state.data = data;
    }

    this._lastStateValue = state;
  }

  get translations() {
    return (this.args.translations || EN) as Translations;
  }

  handleChange = ({ target }: ChangeEvent) => {
    //eslint-disable-next-line
    const newData = cloneDeep(this._lastStateValue.data);

    set(newData, target.name, target.value);

    this._lastStateValue.data = newData;

    //eslint-disable-next-line
    const rrule = computeRRuleToString(newData!);

    this.args.onChange?.(rrule);
  };

  get showStart() {
    return this.args.config?.hideStart !== true;
  }

  get showEnd() {
    return this.args.config?.hideEnd !== true;
  }
}
