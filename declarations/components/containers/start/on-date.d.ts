import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
type Signature = BaseContainerSignature & {
    Args: {
        onDate: RRuleGenerator['state']['data']['start']['onDate'];
    };
};
export default class ContainersStartOnDateComponent extends BaseContainerComponent<Signature> {
}
export {};
//# sourceMappingURL=on-date.d.ts.map