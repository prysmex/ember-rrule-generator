import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import type { MonthlyMode } from '../../r-rule-generator/index';
import MonthlyOn from './monthly-on';
import MonthlyOnThe from './monthly-on-the';
import MonthlySelectMode from './monthly-select-mode';
import MonthlyInterval from './monthly-interval';
type Monthly = RRuleGenerator['state']['data']['repeat']['monthly'];
type Signature = BaseContainerSignature & {
    Args: {
        handleChange: RRuleGenerator['handleChange'];
        monthly: Monthly;
    };
};
export default class ContainersRepeatMonthlyComponent extends BaseContainerComponent<Signature> {
    MonthlySelectMode: typeof MonthlySelectMode;
    MonthlyInterval: typeof MonthlyInterval;
    MonthlyOn: typeof MonthlyOn;
    MonthlyOnThe: typeof MonthlyOnThe;
    isNotTheOnlyMode: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [MonthlyMode, {
                modes: MonthlyMode | undefined;
                allowBYSETPOS: boolean | undefined;
                negativeDaysQuantity: number | true;
            }];
            Named: object;
        };
        Return: boolean | undefined;
    }>;
    isOptionAvailable: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [MonthlyMode, {
                modes: MonthlyMode | undefined;
                allowBYSETPOS: boolean | undefined;
                negativeDaysQuantity: number | true;
            }];
            Named: object;
        };
        Return: boolean;
    }>;
    isModeActive: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [MonthlyMode, MonthlyMode];
            Named: object;
        };
        Return: boolean;
    }>;
    get availableOptions(): {
        value: string;
        label: string;
    }[];
    get labels(): {
        label: string | null;
        every: string | null;
        months: string | null;
        which: string | null;
        on_day: string | null;
        on_the: string | null;
    };
    get allowBYSETPOS(): boolean;
    get negativeDaysQuantity(): number | true;
}
export {};
//# sourceMappingURL=monthly.d.ts.map