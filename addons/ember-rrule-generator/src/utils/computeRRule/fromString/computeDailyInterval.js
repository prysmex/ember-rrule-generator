const computeDailyInterval = (data, rruleObj) => {
  if (rruleObj.freq !== 3) {
    return data.repeat.daily.interval || 1;
  }

  return rruleObj.interval || 1;
};

export default computeDailyInterval;
