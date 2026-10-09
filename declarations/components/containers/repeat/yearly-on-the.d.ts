import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import YearlyOnTheMonth from './yearly-on-the-month';
import YearlyOnTheDay from './yearly-on-the-day';
import YearlyOnTheWhich from './yearly-on-the-which';
import type RRuleGenerator from '../../r-rule-generator/index';
type OnThe = RRuleGenerator['state']['data']['repeat']['yearly']['onThe'];
type allowBYSETPOS = RRuleGenerator['state']['data']['repeat']['yearly']['options']['allowBYSETPOS'];
type Signature = BaseContainerSignature & {
    Args: {
        onThe: OnThe;
        allowBYSETPOS?: allowBYSETPOS;
    };
};
export default class ContainersRepeatYearlyOnTheComponent extends BaseContainerComponent<Signature> {
    YearlyOnTheMonth: typeof YearlyOnTheMonth;
    YearlyOnTheDay: typeof YearlyOnTheDay;
    YearlyOnTheWhich: typeof YearlyOnTheWhich;
    get months(): {
        value: string;
        label: string | null;
    }[];
    get whichs(): {
        value: string;
        label: string | null;
    }[];
    get days(): {
        value: string;
        label: string | null;
    }[];
}
export {};
//# sourceMappingURL=yearly-on-the.d.ts.map