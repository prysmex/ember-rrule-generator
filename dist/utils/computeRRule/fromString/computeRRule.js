import { rrulestr } from 'rrule';
import dayjs from 'dayjs';
import computeStartOnDate from './computeStartOnDate.js';
import computeFrequency from './computeFrequency.js';
import computeYearlyMode from './computeYearlyMode.js';
import computeYearlyInterval from './computeYearlyInterval.js';
import computeYearlyOnMonth from './computeYearlyOnMonth.js';
import computeYearlyOnMonthday from './computeYearlyOnMonthday.js';
import computeYearlyOnTheMonth from './computeYearlyOnTheMonth.js';
import computeYearlyOnTheMonthday from './computeYearlyOnTheMonthday.js';
import computeYearlyOnTheWhich from './computeYearlyOnTheWhich.js';
import computeMonthlyMode from './computeMonthlyMode.js';
import computeMonthlyInterval from './computeMonthlyInterval.js';
import computeMonthlyOnDay from './computeMonthlyOnDay.js';
import computeMonthlyOnTheDay from './computeMonthlyOnTheDay.js';
import computeMonthlyOnTheWhich from './computeMonthlyOnTheWhich.js';
import computeWeeklyInterval from './computeWeeklyInterval.js';
import computeWeeklyDays from './computeWeeklyDays.js';
import computeWeekStartDay from './computeWeekStartDay.js';
import computeDailyInterval from './computeDailyInterval.js';
import computeHourlyInterval from './computeHourlyInterval.js';
import computeEndMode from './computeEndMode.js';
import computeEndAfter from './computeEndAfter.js';
import computeEndOnDate from './computeEndOnDate.js';
import computeMinutelyInterval from './computeMinutelyInterval.js';
import computeTimezone from './computeTimezone.js';

const computeRRule = (data, rrule) => {
  if (!rrule) {
    return data;
  }
  let newDataObj;
  try {
    const rruleObj = rrulestr(rrule).origOptions;
    const startOnDateDate = computeStartOnDate(data, rruleObj);
    const endOnDateDate = computeEndOnDate(data, rruleObj);
    newDataObj = {
      ...data,
      start: {
        ...data.start,
        onDate: {
          date: startOnDateDate && dayjs(startOnDateDate).isValid() ? dayjs(startOnDateDate).toDate() : null,
          options: {
            ...data.start.onDate.options,
            weekStartsOnSunday: computeWeekStartDay(data, rruleObj)
          }
        }
      },
      repeat: {
        ...data.repeat,
        frequency: computeFrequency(data, rruleObj),
        yearly: {
          ...data.repeat.yearly,
          mode: computeYearlyMode(data, rruleObj),
          interval: computeYearlyInterval(data, rruleObj),
          on: {
            month: computeYearlyOnMonth(data, rruleObj),
            day: computeYearlyOnMonthday(data, rruleObj)
          },
          onThe: {
            month: computeYearlyOnTheMonth(data, rruleObj),
            day: computeYearlyOnTheMonthday(data, rruleObj),
            which: computeYearlyOnTheWhich(data, rruleObj)
          }
        },
        monthly: {
          ...data.repeat.monthly,
          mode: computeMonthlyMode(data, rruleObj),
          interval: computeMonthlyInterval(data, rruleObj),
          on: {
            day: computeMonthlyOnDay(data, rruleObj)
          },
          onThe: {
            day: computeMonthlyOnTheDay(data, rruleObj),
            which: computeMonthlyOnTheWhich(data, rruleObj)
          }
        },
        weekly: {
          interval: computeWeeklyInterval(data, rruleObj),
          days: computeWeeklyDays(data, rruleObj),
          options: {
            weekStartsOnSunday: computeWeekStartDay(data, rruleObj)
          }
        },
        daily: {
          interval: computeDailyInterval(data, rruleObj)
        },
        hourly: {
          interval: computeHourlyInterval(data, rruleObj)
        },
        minutely: {
          interval: computeMinutelyInterval(data, rruleObj)
        }
      },
      end: {
        ...data.end,
        mode: computeEndMode(data, rruleObj),
        after: computeEndAfter(data, rruleObj),
        onDate: {
          date: endOnDateDate && dayjs(endOnDateDate).isValid() ? dayjs(endOnDateDate).toDate() : null,
          options: {
            ...data.end.onDate.options,
            weekStartsOnSunday: computeWeekStartDay(data, rruleObj)
          }
        }
      },
      timezone: {
        ...data.timezone,
        tzid: computeTimezone(data, rruleObj)
      },
      options: {
        ...data.options,
        weekStartsOnSunday: computeWeekStartDay(data, rruleObj)
      },
      error: null
    };
  } catch (e) {
    return {
      ...data,
      error: {
        value: rrule,
        message: e
      }
    };
  }
  return newDataObj;
};

export { computeRRule as default };
//# sourceMappingURL=computeRRule.js.map
