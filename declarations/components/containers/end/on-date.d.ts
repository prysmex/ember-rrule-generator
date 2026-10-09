import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
type Signature = BaseContainerSignature & {
    Args: {
        onDate: RRuleGenerator['state']['data']['end']['onDate'] & {
            date?: Date | string | null;
        };
    };
};
export default class ContainersEndOnDateComponent extends BaseContainerComponent<Signature> {
}
export {};
//# sourceMappingURL=on-date.d.ts.map