import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';

import type RRuleGenerator from '../../r-rule-generator/index.gts';
import type { FrequencyValue } from '../../r-rule-generator/index.gts';

import { helper } from '@ember/component/helper';

import SelectFrequency from './select-frequency.gts';
import RepeatYearly from './yearly.gts';
import RepeatMonthly from './monthly.gts';
import RepeatWeekly from './weekly.gts';
import RepeatDaily from './daily.gts';
import RepeatHourly from './hourly.gts';
import RepeatMinutely from './minutely.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type Repeat = RRuleGenerator['state']['data']['repeat'];

type Signature = BaseContainerSignature & {
  Args: {
    repeat: Repeat;
  };
};

const isOptionAvailable = (
  option: FrequencyValue,
  options: Repeat['options'],
) => {
  return (
    !options?.frequency ||
    (options?.frequency as string[]).indexOf(option) !== -1
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

    if (isOptionAvailable('Yearly', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Yearly',
        label: translateLabel(this.args.translations, 'repeat.yearly.label'),
      });
    }
    if (isOptionAvailable('Monthly', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Monthly',
        label: translateLabel(this.args.translations, 'repeat.monthly.label'),
      });
    }
    if (isOptionAvailable('Weekly', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Weekly',
        label: translateLabel(this.args.translations, 'repeat.weekly.label'),
      });
    }
    if (isOptionAvailable('Daily', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Daily',
        label: translateLabel(this.args.translations, 'repeat.daily.label'),
      });
    }
    if (isOptionAvailable('Hourly', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Hourly',
        label: translateLabel(this.args.translations, 'repeat.hourly.label'),
      });
    }
    if (isOptionAvailable('Minutely', this.args.repeat.options)) {
      availableOptions.push({
        value: 'Minutely',
        label: translateLabel(this.args.translations, 'repeat.minutely.label'),
      });
    }

    return availableOptions;
  }

  isOptionSelected = helper(function ([option, frequency]: [
    FrequencyValue,
    Repeat['frequency'] | undefined,
  ]) {
    return frequency === option;
  });

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.label'),
    };
  }

  <template>
    {{#let
      (hash
        Select=(component
          this.SelectFrequency
          id=(concat @id "-select")
          options=this.availableOptions
          value=@repeat.frequency
          handleChange=@handleChange
          name=(concat @name ".frequency")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        Yearly=(component
          this.RepeatYearly
          id=(concat @id "-yearly")
          yearly=@repeat.yearly
          name=(concat @name ".yearly")
          handleChange=@handleChange
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        Monthly=(component
          this.RepeatMonthly
          id=(concat @id "-monthly")
          monthly=@repeat.monthly
          name=(concat @name ".monthly")
          handleChange=@handleChange
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        Weekly=(component
          this.RepeatWeekly
          id=(concat @id "-weekly")
          weekly=@repeat.weekly
          name=(concat @name ".weekly")
          handleChange=@handleChange
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        Daily=(component
          this.RepeatDaily
          id=(concat @id "-daily")
          daily=@repeat.daily
          name=(concat @name ".daily")
          handleChange=@handleChange
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        Hourly=(component
          this.RepeatHourly
          id=(concat @id "-hourly")
          hourly=@repeat.hourly
          name=(concat @name ".hourly")
          handleChange=@handleChange
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        Minutely=(component
          this.RepeatMinutely
          id=(concat @id "-minutely")
          minutely=@repeat.minutely
          name=(concat @name ".minutely")
          handleChange=@handleChange
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
        labels=this.labels
        isYearlyActive=(this.isOptionSelected "Yearly" @repeat.frequency)
        isMonthlyActive=(this.isOptionSelected "Monthly" @repeat.frequency)
        isWeeklyActive=(this.isOptionSelected "Weekly" @repeat.frequency)
        isDailyActive=(this.isOptionSelected "Daily" @repeat.frequency)
        isHourlyActive=(this.isOptionSelected "Hourly" @repeat.frequency)
        isMinutelyActive=(this.isOptionSelected "Minutely" @repeat.frequency)
        handleChange=@handleChange
        name=@name
        translations=@translations
      )
      as |Repeat|
    }}
      {{#if (has-block)}}
        {{yield Repeat}}
      {{else}}
        {{#let (component @view) as |RepeatComponent|}}
          <RepeatComponent @Repeat={{Repeat}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
