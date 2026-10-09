import type { ChangeEvent } from '../../r-rule-generator/index';
import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
type Signature = BaseContainerSignature & {
    Args: {
        days?: unknown[];
    };
};
export default class ContainersRepeatWeeklyDaysComponent extends BaseContainerComponent<Signature> {
    onDaysChange: (isDayActive: boolean, e: ChangeEvent) => void;
}
export {};
//# sourceMappingURL=weekly-days.d.ts.map