const computeTimezone = ({
  tzid
}) => {
  const tz = {};
  if (tzid) {
    tz.tzid = tzid;
  }
  return tz;
};

export { computeTimezone as default };
//# sourceMappingURL=computeTimezone.js.map
