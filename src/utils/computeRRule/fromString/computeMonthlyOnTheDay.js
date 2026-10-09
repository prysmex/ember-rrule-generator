import { Frequency } from 'rrule';

const computeMonthlyOnTheDay = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.MONTHLY || !rruleObj.byweekday) {
    return data.repeat.monthly.onThe.day;
  }

  const weekdays = rruleObj.byweekday
    .map((weekday) => weekday.weekday)
    .join(',');

  switch (weekdays) {
    case '0': {
      return 'Monday';
    }
    case '1': {
      return 'Tuesday';
    }
    case '2': {
      return 'Wednesday';
    }
    case '3': {
      return 'Thursday';
    }
    case '4': {
      return 'Friday';
    }
    case '5': {
      return 'Saturday';
    }
    case '6': {
      return 'Sunday';
    }
    case '0,1,2,3,4': {
      return 'Weekday';
    }
    case '5,6': {
      return 'Weekend day';
    }
    default: {
      return data.repeat.monthly.onThe.day;
    }
  }
};

export default computeMonthlyOnTheDay;
