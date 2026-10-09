import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import HourlyInterval from './hourly-interval';
type Signature = BaseContainerSignature & {
    Args: {
        hourly: RRuleGenerator['state']['data']['repeat']['hourly'];
    };
};
export default class ContainersRepeatHourlyComponent extends BaseContainerComponent<Signature> {
    HourlyInterval: typeof HourlyInterval;
    get labels(): {
        label: string | null;
        every: string | null;
        hours: string | null;
        which: string | null;
    };
}
export {};
//# sourceMappingURL=hourly.d.ts.map