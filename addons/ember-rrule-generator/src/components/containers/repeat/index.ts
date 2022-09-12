import BaseContainerComponent, {
  BaseContainerSignature,
} from '../base-container';

import RRuleGenerator, { FrequencyValue } from '../../r-rule-generator/index';

import { helper } from '@ember/component/helper';

import SelectFrequency from './select-frequency';
import RepeatYearly from './yearly';
import RepeatMonthly from './monthly';
import RepeatWeekly from './weekly';
import RepeatDaily from './daily';
import RepeatHourly from './hourly';
import RepeatMinutely from './minutely';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';

type Repeat = RRuleGenerator['state']['data']['repeat'];

type Signature = BaseContainerSignature & {
  Args: {
    repeat: Repeat;
  };
};

const isOptionAvailable = (
  option: FrequencyValue,
  options: Repeat['options']
) => {
  return (
    !options?.frequency ||
    (options?.frequency as string[]).indexOf(option as string) !== -1
  );
};

export default class ContainersRepeatComponent extends BaseContainerComponent<Signature> {
  SelectFrequency = SelectFrequency;
  RepeatYearly = RepeatYearly;
  RepeatMonthly = RepeatMonthly;
  RepeatWeekly = RepeatWeekly;
  RepeatDaily = RepeatDaily;
  RepeatHourly = RepeatHourly;
  RepeatMinutely = RepeatMinutely;

  get availableOptions() {
    const availableOptions: {
      value: FrequencyValue;
      label: string | null;
    }[] = [];

    isOptionAvailable('Yearly', this.args.repeat.options) &&
      availableOptions.push({
        value: 'Yearly',
        label: translateLabel(this.args.translations, 'repeat.yearly.label'),
      });
    isOptionAvailable('Monthly', this.args.repeat.options) &&
      availableOptions.push({
        value: 'Monthly',
        label: translateLabel(this.args.translations, 'repeat.monthly.label'),
      });
    isOptionAvailable('Weekly', this.args.repeat.options) &&
      availableOptions.push({
        value: 'Weekly',
        label: translateLabel(this.args.translations, 'repeat.weekly.label'),
      });
    isOptionAvailable('Daily', this.args.repeat.options) &&
      availableOptions.push({
        value: 'Daily',
        label: translateLabel(this.args.translations, 'repeat.daily.label'),
      });
    isOptionAvailable('Hourly', this.args.repeat.options) &&
      availableOptions.push({
        value: 'Hourly',
        label: translateLabel(this.args.translations, 'repeat.hourly.label'),
      });
    isOptionAvailable('Minutely', this.args.repeat.options) &&
      availableOptions.push({
        value: 'Minutely',
        label: translateLabel(this.args.translations, 'repeat.minutely.label'),
      });

    return availableOptions;
  }

  isOptionSelected = helper(function ([frequency, option]: [
    Repeat['frequency'],
    keyof Repeat['options']['frequency']
  ]) {
    return frequency === option;
  });

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.label'),
    };
  }
}
