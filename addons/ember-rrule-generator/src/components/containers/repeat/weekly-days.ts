import { ChangeEvent } from 'ember-rrule-generator/components/r-rule-generator';
import BaseContainerComponent from '../base-container';

export default class ContainersRepeatWeeklyDaysComponent extends BaseContainerComponent {
  onDaysChange = (isDayActive: boolean, e: ChangeEvent) => {
    const editedEvent = {
      ...e,
      target: {
        ...e.target,
        value: !isDayActive,
        name: e.target.name,
      },
    };

    this.args.handleChange(editedEvent);
  };
}
