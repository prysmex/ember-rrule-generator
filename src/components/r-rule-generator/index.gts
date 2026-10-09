import { hash } from '@ember/helper';
import { cloneDeep, set } from 'lodash-es';

import Component from '@glimmer/component';
import type Owner from '@ember/owner';

import computeRRuleToString from '../../utils/computeRRule/toString/computeRRule.js';
import computeRRuleFromString from '../../utils/computeRRule/fromString/computeRRule.js';
import configureInitialState from '../../utils/configureInitialState.ts';

import Start from '../containers/start/index.gts';
import End from '../containers/end/index.gts';
import Repeat from '../containers/repeat/index.gts';
import Timezone from '../containers/timezone/index.gts';

import EN from '../../translations/en.js';
import type { Translations } from '../../utils/translateLabel.ts';
export interface ChangeEvent {
  target: {
    value: unknown;
    name: string;
  };
}

export type EndValue = 'Never' | 'After' | 'On date';
export type FrequencyValue =
  'Yearly' | 'Monthly' | 'Weekly' | 'Daily' | 'Hourly' | 'Minutely';

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
    isDisabled?: boolean;
  };
  Blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: [any];
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

  _lastValue: unknown;

  get state() {
    const newState = new State({
      ...this._lastStateValue,
      data: computeRRuleFromString(
        this._lastStateValue.data,
        this.args.value,
      ) as State['data'],
    });
    //eslint-disable-next-line
    this._lastStateValue = newState;
    return newState;
  }

  constructor(owner: Owner, args: Signature['Args']) {
    super(owner, args);

    const state = new State(
      configureInitialState(this.args.config, this.args.id),
    );

    if (this.args.value) {
      const data = computeRRuleFromString(
        state.data,
        this.args.value,
      ) as State['data'];

      state.data = data;
    }

    this._lastStateValue = state;
  }

  get translations() {
    return (this.args.translations || EN) as Translations;
  }

  handleChange = ({ target }: ChangeEvent) => {
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

  <template>
    {{yield
      (hash
        Repeat=(component
          this.Repeat
          handleChange=this.handleChange
          repeat=this.state.data.repeat
          id=this.state.id
          name="repeat"
          translations=this.translations
          isDisabled=@isDisabled
        )
        Start=(component
          this.Start
          handleChange=this.handleChange
          start=this.state.data.start
          name="start"
          id=this.state.id
          translations=this.translations
          isDisabled=@isDisabled
        )
        End=(component
          this.End
          handleChange=this.handleChange
          end=this.state.data.end
          name="end"
          id=this.state.id
          translations=this.translations
          isDisabled=@isDisabled
        )
        Timezone=(component
          this.Timezone
          handleChange=this.handleChange
          timezone=this.state.data.timezone
          name="timezone"
          id=this.state.id
          translations=this.translations
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
      )
    }}
  </template>
}
