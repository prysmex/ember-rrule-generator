import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import MonthlyOnDay from './monthly-on-day';
import type RRuleGenerator from '../../r-rule-generator/index';
type On = RRuleGenerator['state']['data']['repeat']['monthly']['on'];
type Signature = BaseContainerSignature & {
    Args: {
        on: On;
        negativeDaysQuantity: RRuleGenerator['state']['data']['repeat']['monthly']['options']['negativeDaysQuantity'];
    };
};
export default class ContainersRepeatMonthlyOnComponent extends BaseContainerComponent<Signature> {
    MonthlyOnDay: typeof MonthlyOnDay;
    get days(): {
        value: number;
        label: string | null;
    }[];
}
export {};
//# sourceMappingURL=monthly-on.d.ts.map