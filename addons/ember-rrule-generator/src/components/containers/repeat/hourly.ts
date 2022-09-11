import BaseContainerComponent from '../base-container';
import HourlyInterval from './hourly-interval';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

export default class ContainersRepeatHourlyComponent extends BaseContainerComponent {
  HourlyInterval = HourlyInterval;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.hourly.every'),
      every: translateLabel(this.args.translations, 'repeat.hourly.every'),
      hours: translateLabel(this.args.translations, 'repeat.hourly.hours'),
    };
  }
}
