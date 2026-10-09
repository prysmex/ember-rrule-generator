export default computeMonthly;
declare function computeMonthly({ mode, interval, on, onThe }: {
    mode: any;
    interval: any;
    on: any;
    onThe: any;
}): {
    bymonthday: any;
    freq: Frequency;
    interval: any;
} | {
    byweekday: import("rrule").Weekday[] | number[];
    bysetpos: number | undefined;
    freq: Frequency;
    interval: any;
};
import { Frequency } from 'rrule';
//# sourceMappingURL=computeMonthly.d.ts.map