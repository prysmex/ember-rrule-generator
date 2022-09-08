import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const computeEnd = ({ mode, after, onDate: { date } }) => {
  const end = {};

  if (mode === 'After') {
    end.count = after;
  }

  if (mode === 'On date') {
    end.until = dayjs.utc(date).format();
  }

  return end;
};

export default computeEnd;
