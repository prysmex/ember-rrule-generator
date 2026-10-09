const computeWeekStartDay = (data, rruleObj) => {
  if (!rruleObj.wkst) {
    return data.options.weekStartsOnSunday;
  }
  const wkst =
    typeof rruleObj.wkst === 'number' ? rruleObj.wkst : rruleObj.wkst.weekday;

  return wkst === 6;
};

export default computeWeekStartDay;
