import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import OnDate from './on-date';
type Signature = BaseContainerSignature & {
    Args: {
        start: RRuleGenerator['state']['data']['start'];
    };
};
export default class ContainersStartComponent extends BaseContainerComponent<Signature> {
    OnDate: typeof OnDate;
    get labels(): {
        label: string | null;
        on: string | null;
    };
}
export {};
//# sourceMappingURL=index.d.ts.map