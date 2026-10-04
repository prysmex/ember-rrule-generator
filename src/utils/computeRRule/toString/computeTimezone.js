const computeTimezone = ({ tzid }) => {
  const tz = {};

  if (tzid) {
    tz.tzid = tzid;
  }

  return tz;
};

export default computeTimezone;
