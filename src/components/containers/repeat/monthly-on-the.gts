import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import MonthlyOnTheDay from './monthly-on-the-day.gts';
import MonthlyOnTheWhich from './monthly-on-the-which.gts';

import type RRuleGenerator from '../../r-rule-generator/index.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type OnThe = RRuleGenerator['state']['data']['repeat']['monthly']['onThe'];
type allowBYSETPOS =
  RRuleGenerator['state']['data']['repeat']['monthly']['options']['allowBYSETPOS'];

import { DAYS } from '../../../utils/constants.js';

type Signature = BaseContainerSignature & {
  Args: {
    onThe: OnThe;
    allowBYSETPOS?: allowBYSETPOS;
  };
};

export default class ContainersRepeatMonthlyOnTheComponent extends BaseContainerComponent<Signature> {
  MonthlyOnTheDay = MonthlyOnTheDay;
  MonthlyOnTheWhich = MonthlyOnTheWhich;

  get days() {
    const filteredDays = DAYS.filter((d) => {
      if (d.match(/^week/i)) return this.args.allowBYSETPOS;
      return true;
    });
    return filteredDays.map((day) => {
      return {
        value: day,
        label: translateLabel(
          this.args.translations,
          `days.${day.toLowerCase().replace(/\s/g, '_')}`,
        ),
      };
    });
  }

  get whichs() {
    return [
      {
        value: 'First',
        label: translateLabel(this.args.translations, 'numerals.first'),
      },
      {
        value: 'Second',
        label: translateLabel(this.args.translations, 'numerals.second'),
      },
      {
        value: 'Third',
        label: translateLabel(this.args.translations, 'numerals.third'),
      },
      {
        value: 'Fourth',
        label: translateLabel(this.args.translations, 'numerals.fourth'),
      },
      {
        value: 'Last',
        label: translateLabel(this.args.translations, 'numerals.last'),
      },
    ];
  }

  <template>
    {{#let
      (hash
        Which=(component
          this.MonthlyOnTheWhich
          id=(concat @id "-which")
          value=@onThe.which
          handleChange=@handleChange
          name=(concat @name ".which")
          options=this.whichs
          isActive=@isActive
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
        )
        Day=(component
          this.MonthlyOnTheDay
          id=(concat @id "-day")
          value=@onThe.day
          handleChange=@handleChange
          name=(concat @name ".day")
          options=this.days
          isActive=@isActive
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
        labels=@labels
        name=@name
        handleChange=@handleChange
        translations=@translations
      )
      as |OnThe|
    }}
      {{#if (has-block)}}
        {{yield OnThe}}
      {{else}}
        {{#let (component @view) as |MonthlyOnTheComponent|}}
          <MonthlyOnTheComponent @OnThe={{OnThe}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
