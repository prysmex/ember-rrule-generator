/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import dayjs from 'dayjs';
import { isEmpty, uniqueId } from 'lodash-es';

import computeRRuleToString from './computeRRule/toString/computeRRule';
import { DATE_TIME_FORMAT } from './constants.js';

import { Config } from 'ember-rrule-generator/components/r-rule-generator';

const configureState = (config: Config = {}, id) => {
  const configureFrequency = () =>
    config.frequency ? config.frequency[0] : 'Yearly';
  const configureYearly = () => config.yearly || 'on';
  const configureMonthly = () => config.monthly || 'on';
  const configureEnd = () => (config.end ? config.end[0] : 'Never');
  const configureHideStart = () => config.hideStart;
  const uniqueRruleId = isEmpty(id) ? uniqueId('rrule-') : id;

  const data = {
    start: {
      onDate: {
        date: dayjs().format(DATE_TIME_FORMAT),
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
        },
      },
    },
    repeat: {
      frequency: configureFrequency(),
      yearly: {
        mode: configureYearly(),
        interval: 1,
        on: {
          month: 'Jan',
          day: 1,
        },
        onThe: {
          month: 'Jan',
          day: 'Monday',
          which: 'First',
        },
        options: {
          modes: config.yearly,
        },
      },
      monthly: {
        mode: configureMonthly(),
        interval: 1,
        on: {
          day: 1,
        },
        onThe: {
          day: 'Monday',
          which: 'First',
        },
        options: {
          modes: config.monthly,
        },
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
          sun: false,
        },
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
        },
      },
      daily: {
        interval: 1,
      },
      hourly: {
        interval: 1,
      },
      options: {
        frequency: config.frequency,
      },
    },
    end: {
      mode: configureEnd(),
      after: 1,
      onDate: {
        date: dayjs().format(DATE_TIME_FORMAT),
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
        },
      },
      options: {
        modes: config.end,
      },
    },
    options: {
      hideStart: configureHideStart(),
      hideEnd: config.hideEnd,
      hideError: config.hideError,
      weekStartsOnSunday: config.weekStartsOnSunday,
    },
    error: null,
  };

  return {
    id: uniqueRruleId as string,
    data,
    rrule: computeRRuleToString(data),
  };
};

export default configureState;
