const computeEndMode = (data, rruleObj) => {
  if (rruleObj.count || rruleObj.count === 0) {
    return 'After';
  }

  if (rruleObj.until || data.end.mode === 'On date') {
    return 'On date';
  }

  return data.end.mode;
};

export default computeEndMode;
