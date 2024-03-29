import dayjs from 'dayjs';

const computeEnd = ({ mode, after, onDate: { date } }) => {
  const end = {};

  if (mode === 'After') {
    end.count = after;
  }

  if (mode === 'On date' && date && dayjs(date).isValid()) {
    end.until = dayjs(date).toDate();
  }

  return end;
};

export default computeEnd;
