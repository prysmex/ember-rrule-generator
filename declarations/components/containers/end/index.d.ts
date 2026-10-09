import type { BaseContainerSignature } from '../base-container';
import Component from '@glimmer/component';
import type RRuleGenerator from '../../r-rule-generator/index';
import type { EndValue } from '../../r-rule-generator/index';
import SelectMode from './select-mode';
import After from './after';
import OnDate from './on-date';
type End = RRuleGenerator['state']['data']['end'];
type Signature = BaseContainerSignature & {
    Args: {
        end: End;
    };
};
export default class ContainersEndIndexComponent extends Component<Signature> {
    SelectMode: typeof SelectMode;
    OnDate: typeof OnDate;
    After: typeof After;
    get labels(): {
        label: string | null;
        tooltip: string | null;
        never: string | null;
        never_help: string | null;
        on_date: string | null;
        on_date_help: string | null;
        after: string | null;
        after_help: string | null;
        executions: string | null;
    };
    get availableOptions(): {
        value: EndValue;
        label: string | null;
    }[];
    isOptionSelected: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [EndValue, EndValue | undefined];
            Named: object;
        };
        Return: boolean;
    }>;
}
export {};
//# sourceMappingURL=index.d.ts.map