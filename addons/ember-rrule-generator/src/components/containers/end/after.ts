import BaseContainerComponent from '../base-container';
import numericalFieldHandler from 'ember-rrule-generator/utils/numerical-field-handler';

export default class ContainersEndAfterComponent extends BaseContainerComponent {
  get numericalFieldHandler() {
    return numericalFieldHandler(this.args.handleChange);
  }
}
