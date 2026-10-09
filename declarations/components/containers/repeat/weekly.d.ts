import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import WeeklyInterval from './weekly-interval';
import WeeklyDays from './weekly-days';
type Weekly = RRuleGenerator['state']['data']['repeat']['weekly'];
type Signature = BaseContainerSignature & {
    Args: {
        weekly: Weekly;
    };
};
export default class ContainersRepeatYearlyOnMonthComponent extends BaseContainerComponent<Signature> {
    WeeklyInterval: typeof WeeklyInterval;
    WeeklyDays: typeof WeeklyDays;
    get days(): (boolean | {
        value: string;
        label: string | null;
        isActive: boolean;
    })[][];
    get labels(): {
        label: string | null;
        every: string | null;
        weeks: string | null;
        which: string | null;
    };
}
export {};
//# sourceMappingURL=weekly.d.ts.map