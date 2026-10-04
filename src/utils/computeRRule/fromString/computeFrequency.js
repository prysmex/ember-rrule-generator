import { RRule } from 'rrule';

const computeFrequency = (data, rruleObj) => {
  switch (rruleObj.freq) {
    case RRule.YEARLY: {
      return 'Yearly';
    }
    case RRule.MONTHLY: {
      return 'Monthly';
    }
    case RRule.WEEKLY: {
      return 'Weekly';
    }
    case RRule.DAILY: {
      return 'Daily';
    }
    case RRule.HOURLY: {
      return 'Hourly';
    }
    case RRule.MINUTELY: {
      return 'Minutely';
    }
    default: {
      return data.repeat.frequency;
    }
  }
};

export default computeFrequency;
