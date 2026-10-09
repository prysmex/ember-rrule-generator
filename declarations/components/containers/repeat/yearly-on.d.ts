import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import YearlyOnMonth from './yearly-on-month';
import YearlyOnDay from './yearly-on-day';
import type RRuleGenerator from '../../r-rule-generator/index';
type On = RRuleGenerator['state']['data']['repeat']['yearly']['on'];
type Signature = BaseContainerSignature & {
    Args: {
        on: On;
        negativeDaysQuantity: RRuleGenerator['state']['data']['repeat']['yearly']['options']['negativeDaysQuantity'];
    };
};
export default class ContainersRepeatYearlyOnComponent extends BaseContainerComponent<Signature> {
    YearlyOnMonth: typeof YearlyOnMonth;
    YearlyOnDay: typeof YearlyOnDay;
    get months(): {
        value: string;
        label: string | null;
    }[];
    get days(): {
        value: number;
        label: string | null;
    }[];
}
export {};
//# sourceMappingURL=yearly-on.d.ts.map