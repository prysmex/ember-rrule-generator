import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import DailyInterval from './daily-interval';
type Signature = BaseContainerSignature & {
    Args: {
        daily: RRuleGenerator['state']['data']['repeat']['daily'];
    };
};
export default class ContainersRepeatDailyComponent extends BaseContainerComponent<Signature> {
    DailyInterval: typeof DailyInterval;
    get labels(): {
        label: string | null;
        every: string | null;
        days: string | null;
        which: string | null;
    };
}
export {};
//# sourceMappingURL=daily.d.ts.map