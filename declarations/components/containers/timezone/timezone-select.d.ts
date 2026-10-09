import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
type Signature = BaseContainerSignature & {
    Args: {
        timezone: RRuleGenerator['state']['data']['timezone'] & {
            tzid?: string;
        };
    };
};
export default class ContainersTimezoneSelectComponent extends BaseContainerComponent<Signature> {
    get options(): {
        value: string;
        label: string;
    }[];
}
export {};
//# sourceMappingURL=timezone-select.d.ts.map