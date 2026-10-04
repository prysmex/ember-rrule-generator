const computeTimezone = (data, rruleObj) => {
  if (!rruleObj.tzid) {
    return data.timezone.tzid;
  }
  return rruleObj.tzid;
};

export default computeTimezone;
