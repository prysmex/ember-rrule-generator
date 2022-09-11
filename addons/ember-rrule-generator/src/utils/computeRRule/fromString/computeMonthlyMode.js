const computeMonthlyMode = (data, rruleObj) => {
  if (rruleObj.freq !== 1) {
    return data.repeat.monthly.mode;
  }

  if (rruleObj.bymonthday) {
    if (typeof rruleObj.bymonthday === 'number' && rruleObj.bymonthday < 0) {
      return 'on the';
    }
    return 'on';
  }

  return 'on the';
};

export default computeMonthlyMode;
