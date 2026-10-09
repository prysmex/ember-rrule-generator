import BaseContainerComponent from '../base-container';
export default class ContainersRepeatMinutelyIntervalComponent extends BaseContainerComponent {
    get numericalFieldHandler(): (e: {
        target: {
            value: string;
            name: string;
        };
    }) => void;
}
//# sourceMappingURL=minutely-interval.d.ts.map