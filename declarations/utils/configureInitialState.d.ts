import type { Config } from '../components/r-rule-generator/index';
declare const configureState: (config?: Config, id?: string) => {
    id: string;
    data: {
        start: {
            onDate: {
                date: string;
                options: {
                    weekStartsOnSunday: boolean | undefined;
                };
            };
        };
        repeat: {
            frequency: import("../index.ts").FrequencyValue | undefined;
            yearly: {
                mode: import("../index.ts").YearlyMode;
                interval: number;
                on: {
                    month: string;
                    day: number;
                };
                onThe: {
                    month: string;
                    day: string;
                    which: string;
                };
                options: {
                    modes: import("../index.ts").YearlyMode | undefined;
                    allowBYSETPOS: boolean | undefined;
                    negativeDaysQuantity: number | true;
                };
            };
            monthly: {
                mode: import("../index.ts").MonthlyMode;
                interval: number;
                on: {
                    day: number;
                };
                onThe: {
                    day: string;
                    which: string;
                };
                options: {
                    modes: import("../index.ts").MonthlyMode | undefined;
                    allowBYSETPOS: boolean | undefined;
                    negativeDaysQuantity: number | true;
                };
            };
            weekly: {
                interval: number;
                days: {
                    mon: boolean;
                    tue: boolean;
                    wed: boolean;
                    thu: boolean;
                    fri: boolean;
                    sat: boolean;
                    sun: boolean;
                };
                options: {
                    weekStartsOnSunday: boolean | undefined;
                };
            };
            daily: {
                interval: number;
            };
            hourly: {
                interval: number;
            };
            minutely: {
                interval: number;
            };
            options: {
                frequency: import("../index.ts").FrequencyValue[] | undefined;
            };
        };
        end: {
            mode: import("../index.ts").EndValue | undefined;
            after: number;
            onDate: {
                options: {
                    weekStartsOnSunday: boolean | undefined;
                };
            };
            options: {
                modes: import("../index.ts").EndValue[] | undefined;
            };
        };
        timezone: {
            options: {
                supportedTimezones: () => string[];
            };
        };
        options: {
            hideStart: boolean | undefined;
            hideEnd: boolean | undefined;
            hideError: boolean | undefined;
            weekStartsOnSunday: boolean | undefined;
            tzid: string | undefined;
        };
        error: null;
    };
    rrule: string;
};
export default configureState;
//# sourceMappingURL=configureInitialState.d.ts.map