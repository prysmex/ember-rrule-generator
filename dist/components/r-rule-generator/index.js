import { hash } from '@ember/helper';
import { cloneDeep, set } from 'lodash-es';
import Component from '@glimmer/component';
import computeRRule$1 from '../../utils/computeRRule/toString/computeRRule.js';
import computeRRule from '../../utils/computeRRule/fromString/computeRRule.js';
import configureState from '../../utils/configureInitialState.js';
import ContainersStartComponent from '../containers/start/index.js';
import ContainersEndIndexComponent from '../containers/end/index.js';
import ContainersRepeatComponent from '../containers/repeat/index.js';
import ContainersStartComponent$1 from '../containers/timezone/index.js';
import EN from '../../translations/en.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class State {
  id;
  data;
  rrule;
  constructor(s) {
    this.id = s.id;
    this.data = s.data;
    this.rrule = s.rrule;
  }
}
class RRuleGenerator extends Component {
  Start = ContainersStartComponent;
  End = ContainersEndIndexComponent;
  Repeat = ContainersRepeatComponent;
  Timezone = ContainersStartComponent$1;
  _lastStateValue;
  _lastValue;
  get state() {
    const newState = new State({
      ...this._lastStateValue,
      data: computeRRule(this._lastStateValue.data, this.args.value)
    });
    //eslint-disable-next-line
    this._lastStateValue = newState;
    return newState;
  }
  constructor(owner, args) {
    super(owner, args);
    const state = new State(configureState(this.args.config, this.args.id));
    if (this.args.value) {
      const data = computeRRule(state.data, this.args.value);
      state.data = data;
    }
    this._lastStateValue = state;
  }
  get translations() {
    return this.args.translations || EN;
  }
  handleChange = ({
    target
  }) => {
    const newData = cloneDeep(this._lastStateValue.data);
    set(newData, target.name, target.value);
    this._lastStateValue.data = newData;
    //eslint-disable-next-line
    const rrule = computeRRule$1(newData);
    this.args.onChange?.(rrule);
  };
  get showStart() {
    return this.args.config?.hideStart !== true;
  }
  get showEnd() {
    return this.args.config?.hideEnd !== true;
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash Repeat=(component this.Repeat handleChange=this.handleChange repeat=this.state.data.repeat id=this.state.id name=\"repeat\" translations=this.translations isDisabled=@isDisabled) Start=(component this.Start handleChange=this.handleChange start=this.state.data.start name=\"start\" id=this.state.id translations=this.translations isDisabled=@isDisabled) End=(component this.End handleChange=this.handleChange end=this.state.data.end name=\"end\" id=this.state.id translations=this.translations isDisabled=@isDisabled) Timezone=(component this.Timezone handleChange=this.handleChange timezone=this.state.data.timezone name=\"timezone\" id=this.state.id translations=this.translations isDisabled=@isDisabled) isDisabled=@isDisabled)}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { RRuleGenerator as default };
//# sourceMappingURL=index.js.map
