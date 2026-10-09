import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import type RRuleGenerator from '../../r-rule-generator/index.gts';

import DailyInterval from './daily-interval.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type Signature = BaseContainerSignature & {
  Args: {
    daily: RRuleGenerator['state']['data']['repeat']['daily'];
  };
};

export default class ContainersRepeatDailyComponent extends BaseContainerComponent<Signature> {
  DailyInterval = DailyInterval;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.daily.label'),
      every: translateLabel(this.args.translations, 'repeat.daily.every'),
      days: translateLabel(this.args.translations, 'repeat.daily.days'),
      which: translateLabel(this.args.translations, 'repeat.daily.days'),
    };
  }

  <template>
    {{#let
      (hash
        Interval=(component
          this.DailyInterval
          id=(concat @id "-interval")
          value=@daily.interval
          handleChange=@handleChange
          name=(concat @name ".interval")
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
      as |Daily|
    }}
      {{#if (has-block)}}
        {{yield Daily}}
      {{else}}
        {{#let (component @view) as |DailyComponent|}}
          <DailyComponent @Daily={{Daily}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
