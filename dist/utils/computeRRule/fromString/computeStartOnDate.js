const computeStartOnDate = (data, rruleObj) => {
  if (!rruleObj.dtstart) {
    return data.start.onDate.date;
  }
  return rruleObj.dtstart;
};

export { computeStartOnDate as default };
//# sourceMappingURL=computeStartOnDate.js.map
