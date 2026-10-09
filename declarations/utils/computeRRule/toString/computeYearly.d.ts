export default computeYearly;
declare function computeYearly({ mode, interval, on, onThe }: {
    mode: any;
    interval: any;
    on: any;
    onThe: any;
}): {
    bymonth: number;
    bymonthday: any;
    freq: Frequency;
    interval: any;
} | {
    byweekday: import("rrule").Weekday[] | number[];
    bysetpos: number | undefined;
    bymonth: number;
    freq: Frequency;
    interval: any;
};
import { Frequency } from 'rrule';
//# sourceMappingURL=computeYearly.d.ts.map