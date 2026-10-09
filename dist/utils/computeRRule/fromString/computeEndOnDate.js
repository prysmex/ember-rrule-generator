const computeEndOnDate = (data, rruleObj) => {
  if (!rruleObj.until) {
    return data.end.onDate.date;
  }
  return rruleObj.until;
};

export { computeEndOnDate as default };
//# sourceMappingURL=computeEndOnDate.js.map
