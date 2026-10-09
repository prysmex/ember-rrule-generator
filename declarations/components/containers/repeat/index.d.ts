import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import type { FrequencyValue } from '../../r-rule-generator/index';
import SelectFrequency from './select-frequency';
import RepeatYearly from './yearly';
import RepeatMonthly from './monthly';
import RepeatWeekly from './weekly';
import RepeatDaily from './daily';
import RepeatHourly from './hourly';
import RepeatMinutely from './minutely';
type Repeat = RRuleGenerator['state']['data']['repeat'];
type Signature = BaseContainerSignature & {
    Args: {
        repeat: Repeat;
    };
};
export default class ContainersRepeatComponent extends BaseContainerComponent<Signature> {
    SelectFrequency: typeof SelectFrequency;
    RepeatYearly: typeof RepeatYearly;
    RepeatMonthly: typeof RepeatMonthly;
    RepeatWeekly: typeof RepeatWeekly;
    RepeatDaily: typeof RepeatDaily;
    RepeatHourly: typeof RepeatHourly;
    RepeatMinutely: typeof RepeatMinutely;
    get availableOptions(): {
        value: FrequencyValue;
        label: string | null;
    }[];
    isOptionSelected: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [FrequencyValue, FrequencyValue | undefined];
            Named: object;
        };
        Return: boolean;
    }>;
    get labels(): {
        label: string | null;
    };
}
export {};
//# sourceMappingURL=index.d.ts.map