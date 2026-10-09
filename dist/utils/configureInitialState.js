import { isEmpty, uniqueId } from 'lodash-es';
import computeRRule from './computeRRule/toString/computeRRule.js';
import dayjs from 'dayjs';

/* eslint-disable */
const configureState = (config = {}, id) => {
  const configureFrequency = () => config.frequency ? config.frequency[0] : 'Yearly';
  const configureYearly = () => config.yearly || 'on';
  const configureMonthly = () => config.monthly || 'on';
  const configureEnd = () => config.end ? config.end[0] : 'Never';
  const configureHideStart = () => config.hideStart;
  const configureSupportedTimezones = () => {
    return config.supportedTimezones || (
    //@ts-ignore
    () => Intl.supportedValuesOf('timeZone'));
  };
  const uniqueRruleId = isEmpty(id) ? uniqueId('rrule-') : id;
  const configureNegativeDaysQuantity = () => config.negativeDaysQuantity || 3;
  const data = {
    start: {
      onDate: {
        date: dayjs().format('YYYY-MM-DD'),
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday
        }
      }
    },
    repeat: {
      frequency: configureFrequency(),
      yearly: {
        mode: configureYearly(),
        interval: 1,
        on: {
          month: 'Jan',
          day: 1
        },
        onThe: {
          month: 'Jan',
          day: 'Monday',
          which: 'First'
        },
        options: {
          modes: config.yearly,
          allowBYSETPOS: config.allowBYSETPOS,
          negativeDaysQuantity: configureNegativeDaysQuantity()
        }
      },
      monthly: {
        mode: configureMonthly(),
        interval: 1,
        on: {
          day: 1
        },
        onThe: {
          day: 'Monday',
          which: 'First'
        },
        options: {
          modes: config.monthly,
          allowBYSETPOS: config.allowBYSETPOS,
          negativeDaysQuantity: configureNegativeDaysQuantity()
        }
      },
      weekly: {
        interval: 1,
        days: {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false
        },
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday
        }
      },
      daily: {
        interval: 1
      },
      hourly: {
        interval: 1
      },
      minutely: {
        interval: 1
      },
      options: {
        frequency: config.frequency
      }
    },
    end: {
      mode: configureEnd(),
      after: 1,
      onDate: {
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday
        }
      },
      options: {
        modes: config.end
      }
    },
    timezone: {
      options: {
        supportedTimezones: configureSupportedTimezones()
      }
    },
    options: {
      hideStart: configureHideStart(),
      hideEnd: config.hideEnd,
      hideError: config.hideError,
      weekStartsOnSunday: config.weekStartsOnSunday,
      tzid: config.tzid
    },
    error: null
  };
  return {
    id: uniqueRruleId,
    data,
    rrule: computeRRule(data)
  };
};

export { configureState as default };
//# sourceMappingURL=configureInitialState.js.map
