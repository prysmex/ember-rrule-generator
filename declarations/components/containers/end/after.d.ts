import BaseContainerComponent, { type BaseContainerSignature } from '../base-container';
type Signature = BaseContainerSignature & {
    Args: {
        after: number;
    };
};
export default class ContainersEndAfterComponent extends BaseContainerComponent<Signature> {
    get numericalFieldHandler(): (e: {
        target: {
            value: string;
            name: string;
        };
    }) => void;
}
export {};
//# sourceMappingURL=after.d.ts.map