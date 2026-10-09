import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import MinutelyInterval from './minutely-interval';
type Signature = BaseContainerSignature & {
    Args: {
        minutely: RRuleGenerator['state']['data']['repeat']['minutely'];
    };
};
export default class ContainersRepeatDailyComponent extends BaseContainerComponent<Signature> {
    MinutelyInterval: typeof MinutelyInterval;
    get labels(): {
        label: string | null;
        every: string | null;
        minutes: string | null;
        which: string | null;
    };
}
export {};
//# sourceMappingURL=minutely.d.ts.map