import { Frequency } from 'rrule';

const computeMonthlyOnTheWhich = (data, rruleObj) => {
  if (rruleObj.freq !== Frequency.MONTHLY) {
    return data.repeat.monthly.onThe.which;
  }

  // A single weekday carries its ordinal itself (BYDAY=+2TU), while
  // weekday / weekend day use BYSETPOS (BYDAY=MO,...,FR;BYSETPOS=2).
  const nth = rruleObj.byweekday?.length === 1 ? rruleObj.byweekday[0].n : undefined;
  const bysetpos = nth ?? (typeof rruleObj.bysetpos === 'number' ? rruleObj.bysetpos : rruleObj.bysetpos?.[0]);
  switch (bysetpos) {
    case 1:
      {
        return 'First';
      }
    case 2:
      {
        return 'Second';
      }
    case 3:
      {
        return 'Third';
      }
    case 4:
      {
        return 'Fourth';
      }
    case -1:
      {
        return 'Last';
      }
    default:
      {
        return data.repeat.monthly.onThe.which;
      }
  }
};

export { computeMonthlyOnTheWhich as default };
//# sourceMappingURL=computeMonthlyOnTheWhich.js.map
