const computeEndAfter = (data, rruleObj) => {
  if (!rruleObj.count && rruleObj.count !== 0) {
    return data.end.after;
  }
  return rruleObj.count;
};

export { computeEndAfter as default };
//# sourceMappingURL=computeEndAfter.js.map
