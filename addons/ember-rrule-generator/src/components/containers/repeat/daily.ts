import BaseContainerComponent from '../base-container';
import DailyInterval from './daily-interval';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

export default class ContainersRepeatDailyComponent extends BaseContainerComponent {
  DailyInterval = DailyInterval;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.daily.label'),
      every: translateLabel(this.args.translations, 'repeat.daily.every'),
      days: translateLabel(this.args.translations, 'repeat.daily.days'),
      which: translateLabel(this.args.translations, 'repeat.daily.days'),
    };
  }
}
