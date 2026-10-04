import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import YearlyOnTheMonth from './yearly-on-the-month.gts';
import YearlyOnTheDay from './yearly-on-the-day.gts';
import YearlyOnTheWhich from './yearly-on-the-which.gts';

import type RRuleGenerator from '../../r-rule-generator/index.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type OnThe = RRuleGenerator['state']['data']['repeat']['yearly']['onThe'];
type allowBYSETPOS =
  RRuleGenerator['state']['data']['repeat']['yearly']['options']['allowBYSETPOS'];

import { MONTHS, DAYS } from '../../../utils/constants.js';

type Signature = BaseContainerSignature & {
  Args: {
    onThe: OnThe;
    allowBYSETPOS?: allowBYSETPOS;
  };
};

export default class ContainersRepeatYearlyOnTheComponent extends BaseContainerComponent<Signature> {
  YearlyOnTheMonth = YearlyOnTheMonth;
  YearlyOnTheDay = YearlyOnTheDay;
  YearlyOnTheWhich = YearlyOnTheWhich;

  get months() {
    return MONTHS.map((month) => {
      return {
        value: month,
        label: translateLabel(
          this.args.translations,
          `months.${month.toLowerCase()}`,
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

  <template>
    {{#let
      (hash
        Which=(component
          this.YearlyOnTheWhich
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
        Month=(component
          this.YearlyOnTheMonth
          id=(concat @id "-month")
          value=@onThe.month
          handleChange=@handleChange
          name=(concat @name ".month")
          options=this.months
          isActive=@isActive
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
        )
        Day=(component
          this.YearlyOnTheDay
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
        translations=@translations
        handleChange=@handleChange
      )
      as |OnThe|
    }}
      {{#if (has-block)}}
        {{yield OnThe}}
      {{else}}
        {{#let (component @view) as |YearlyOnTheComponent|}}
          <YearlyOnTheComponent @OnThe={{OnThe}} ...attributes />
        {{/let}}
      {{/if}}

    {{/let}}
  </template>
}
