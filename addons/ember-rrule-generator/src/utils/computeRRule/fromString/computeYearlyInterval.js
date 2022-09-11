const computeMonthlyInterval = (data, rruleObj) => {
  if (rruleObj.freq !== 1) {
    return data.repeat.yearly.interval || 1;
  }

  return rruleObj.interval || 1;
};

export default computeMonthlyInterval;
