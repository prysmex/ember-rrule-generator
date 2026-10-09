import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
import type RRuleGenerator from '../../r-rule-generator/index';
import TimezoneSelect from './timezone-select';
type Signature = BaseContainerSignature & {
    Args: {
        timezone: RRuleGenerator['state']['data']['timezone'];
    };
};
export default class ContainersStartComponent extends BaseContainerComponent<Signature> {
    TimezoneSelect: typeof TimezoneSelect;
    get labels(): {
        label: string | null;
    };
}
export {};
//# sourceMappingURL=index.d.ts.map