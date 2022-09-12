import BaseContainerComponent from '../base-container';
import MinutelyInterval from './minutely-interval';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

export default class ContainersRepeatDailyComponent extends BaseContainerComponent {
  MinutelyInterval = MinutelyInterval;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.minutely.label'),
      every: translateLabel(this.args.translations, 'repeat.minutely.every'),
      minutes: translateLabel(
        this.args.translations,
        'repeat.minutely.minutes'
      ),
      which: translateLabel(this.args.translations, 'repeat.minutely.minutes'),
    };
  }
}
