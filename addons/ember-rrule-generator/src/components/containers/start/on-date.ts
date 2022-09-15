import BaseContainerComponent from '../base-container';
import { DATE_TIME_FORMAT } from 'ember-rrule-generator/utils/constants';
import dayjs from 'dayjs';

export default class ContainersStartOnDateComponent extends BaseContainerComponent {
  dateFormat = DATE_TIME_FORMAT;

  handleDateChange = (inputDate: Date | undefined) => {
    const editedEvent = {
      target: {
        value: dayjs(inputDate).format(DATE_TIME_FORMAT),
        name: 'start.onDate.date',
      },
    };

    this.args.handleChange(editedEvent);
  };
}
