const computeTimezone = (data, rruleObj) => {
  if (!rruleObj.tzid) {
    return data.timezone.tzid;
  }
  return rruleObj.tzid;
};

export { computeTimezone as default };
//# sourceMappingURL=computeTimezone.js.map
