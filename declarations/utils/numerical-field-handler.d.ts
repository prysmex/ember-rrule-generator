type EventToAdapt = {
    target: {
        value: string;
        name: string;
    };
};
type AdaptedEvent = {
    target: {
        value: number;
        name: string;
    };
};
declare const numericalFieldHandler: (callback: (e: AdaptedEvent) => unknown) => (e: EventToAdapt) => void;
export default numericalFieldHandler;
//# sourceMappingURL=numerical-field-handler.d.ts.map