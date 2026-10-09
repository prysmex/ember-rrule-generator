import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import MonthlyOnTheDay from './monthly-on-the-day';
import MonthlyOnTheWhich from './monthly-on-the-which';
import type RRuleGenerator from '../../r-rule-generator/index';
type OnThe = RRuleGenerator['state']['data']['repeat']['monthly']['onThe'];
type allowBYSETPOS = RRuleGenerator['state']['data']['repeat']['monthly']['options']['allowBYSETPOS'];
type Signature = BaseContainerSignature & {
    Args: {
        onThe: OnThe;
        allowBYSETPOS?: allowBYSETPOS;
    };
};
export default class ContainersRepeatMonthlyOnTheComponent extends BaseContainerComponent<Signature> {
    MonthlyOnTheDay: typeof MonthlyOnTheDay;
    MonthlyOnTheWhich: typeof MonthlyOnTheWhich;
    get days(): {
        value: string;
        label: string | null;
    }[];
    get whichs(): {
        value: string;
        label: string | null;
    }[];
}
export {};
//# sourceMappingURL=monthly-on-the.d.ts.map