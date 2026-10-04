import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import { toPairs } from 'lodash-es';
import type RRuleGenerator from '../../r-rule-generator/index.gts';
import translateLabel from '../../../utils/translateLabel.ts';

import WeeklyInterval from './weekly-interval.gts';
import WeeklyDays from './weekly-days.gts';

type Weekly = RRuleGenerator['state']['data']['repeat']['weekly'];

type Signature = BaseContainerSignature & {
  Args: {
    weekly: Weekly;
  };
};

export default class ContainersRepeatYearlyOnMonthComponent extends BaseContainerComponent<Signature> {
  WeeklyInterval = WeeklyInterval;
  WeeklyDays = WeeklyDays;

  get days() {
    let daysArray = toPairs(this.args.weekly.days);
    if (this.args.weekly.options.weekStartsOnSunday) {
      daysArray = daysArray.slice(-1).concat(daysArray.slice(0, -1));
    }
    return daysArray.map((dayArray) => {
      return [
        {
          value: dayArray[0],
          label: translateLabel(
            this.args.translations,
            `days_short.${dayArray[0].toLowerCase()}`,
          ),
          isActive: dayArray[1],
        },
        dayArray[1],
      ];
    });
  }

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.weekly.label'),
      every: translateLabel(this.args.translations, 'repeat.weekly.every'),
      weeks: translateLabel(this.args.translations, 'repeat.weekly.weeks'),
      which: translateLabel(this.args.translations, 'repeat.weekly.weeks'),
    };
  }

  <template>
    {{#let
      (hash
        Interval=(component
          this.WeeklyInterval
          id=(concat @id "-interval")
          value=@weekly.interval
          handleChange=@handleChange
          name=(concat @name ".interval")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        Days=(component
          this.WeeklyDays
          id=(concat @id "-days")
          days=this.days
          value=@weekly.days
          handleChange=@handleChange
          name=(concat @name ".days")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
        labels=this.labels
        name=@name
        handleChange=@handleChange
        translations=@translations
      )
      as |Weekly|
    }}
      {{#if (has-block)}}
        {{yield Weekly}}
      {{else}}
        {{#let (component @view) as |WeeklyComponent|}}
          <WeeklyComponent @Weekly={{Weekly}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
