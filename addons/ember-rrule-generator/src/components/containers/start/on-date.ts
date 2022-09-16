import BaseContainerComponent from '../base-container';
import { DATE_TIME_FORMAT } from 'ember-rrule-generator/utils/constants';
import dayjs from 'dayjs';

export default class ContainersStartOnDateComponent extends BaseContainerComponent {
  dateFormat = DATE_TIME_FORMAT;

  handleDateChange: BaseContainerComponent['args']['handleChange'] = (e) => {
    const editedEvent = {
      target: {
        value: dayjs(e.target.value as Date).format(DATE_TIME_FORMAT),
        name: e.target.name,
      },
    };

    this.args.handleChange(editedEvent);
  };
}
