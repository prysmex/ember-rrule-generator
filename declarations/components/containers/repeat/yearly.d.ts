import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import type { YearlyMode } from '../../r-rule-generator/index';
import YearlyInterval from './yearly-interval';
import YearlyOn from './yearly-on';
import YearlyOnThe from './yearly-on-the';
import YearlySelectMode from './yearly-select-mode';
type Yearly = RRuleGenerator['state']['data']['repeat']['yearly'];
type Signature = BaseContainerSignature & {
    Args: {
        yearly: Yearly;
    };
};
export default class ContainersRepeatYearlyComponent extends BaseContainerComponent<Signature> {
    YearlyInterval: typeof YearlyInterval;
    YearlyOn: typeof YearlyOn;
    YearlyOnThe: typeof YearlyOnThe;
    YearlySelectMode: typeof YearlySelectMode;
    isNotTheOnlyMode: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [YearlyMode, {
                modes: YearlyMode | undefined;
                allowBYSETPOS: boolean | undefined;
                negativeDaysQuantity: number | true;
            }];
            Named: object;
        };
        Return: boolean | undefined;
    }>;
    isOptionAvailable: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [YearlyMode, {
                modes: YearlyMode | undefined;
                allowBYSETPOS: boolean | undefined;
                negativeDaysQuantity: number | true;
            }];
            Named: object;
        };
        Return: boolean;
    }>;
    isModeActive: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [YearlyMode, YearlyMode, ...unknown[]];
            Named: object;
        };
        Return: boolean;
    }>;
    get availableOptions(): {
        value: string;
        label: string | null;
    }[];
    get labels(): {
        label: string | null;
        every: string | null;
        years: string | null;
        which: string | null;
        on: string | null;
        on_the: string | null;
        of: string | null;
    };
    get allowBYSETPOS(): boolean;
    get negativeDaysQuantity(): number | true;
}
export {};
//# sourceMappingURL=yearly.d.ts.map