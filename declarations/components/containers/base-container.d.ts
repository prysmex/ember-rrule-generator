import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type RRuleGenerator from '../r-rule-generator/index';
import type { ChangeEvent } from '../r-rule-generator/index';
export interface BaseContainerSignature {
    Args: {
        handleChange: RRuleGenerator['handleChange'];
        translations: RRuleGenerator['translations'];
        name: string;
        id?: string;
        isDisabled?: boolean;
        isActive?: boolean;
        labels?: Record<string, string | null>;
        value?: unknown;
        options?: unknown[];
        /**
         * The component used to render this piece of UI when no block is given.
         */
        view?: ComponentLike<{
            Args: any;
            Blocks: any;
            Element: any;
        }>;
    };
    Blocks: {
        default: [any];
    };
    Element: any;
}
export default class BaseContainerComponent<Args extends BaseContainerSignature = BaseContainerSignature> extends Component<Args> {
    handleChange: (e: ChangeEvent) => void;
}
//# sourceMappingURL=base-container.d.ts.map