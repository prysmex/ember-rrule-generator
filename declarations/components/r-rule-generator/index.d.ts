import Component from '@glimmer/component';
import type Owner from '@ember/owner';
import configureInitialState from '../../utils/configureInitialState.ts';
import Start from '../containers/start/index';
import End from '../containers/end/index';
import Repeat from '../containers/repeat/index';
import Timezone from '../containers/timezone/index';
import type { Translations } from '../../utils/translateLabel.ts';
export interface ChangeEvent {
    target: {
        value: unknown;
        name: string;
    };
}
export type EndValue = 'Never' | 'After' | 'On date';
export type FrequencyValue = 'Yearly' | 'Monthly' | 'Weekly' | 'Daily' | 'Hourly' | 'Minutely';
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
        default: [any];
    };
};
type TheState = ReturnType<typeof configureInitialState>;
declare class State {
    id: TheState['id'];
    data: TheState['data'];
    rrule: TheState['rrule'];
    constructor(s: TheState);
}
export default class RRuleGenerator extends Component<Signature> {
    Start: typeof Start;
    End: typeof End;
    Repeat: typeof Repeat;
    Timezone: typeof Timezone;
    _lastStateValue: State;
    _lastValue: unknown;
    get state(): State;
    constructor(owner: Owner, args: Signature['Args']);
    get translations(): Translations;
    handleChange: ({ target }: ChangeEvent) => void;
    get showStart(): boolean;
    get showEnd(): boolean;
}
export {};
//# sourceMappingURL=index.d.ts.map