import dayjs from 'dayjs';

const computeStart = ({ onDate: { date } }) => {
  // verify that incoming date is valid
  // by seeing if it can be converted into a moment object.
  // if not, then create a new date
  if (date && dayjs(date).isValid()) {
    return {
      dtstart: dayjs(date).toDate(),
    };
  }

  
};

export default computeStart;
