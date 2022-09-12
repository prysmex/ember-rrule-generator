import numericalFieldHandler from 'ember-rrule-generator/utils/numerical-field-handler';
import BaseContainerComponent from '../base-container';

export default class ContainersRepeatMinutelyIntervalComponent extends BaseContainerComponent {
  get numericalFieldHandler() {
    return numericalFieldHandler(this.args.handleChange);
  }
}
