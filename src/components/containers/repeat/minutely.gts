import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import type RRuleGenerator from '../../r-rule-generator/index.gts';

import MinutelyInterval from './minutely-interval.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type Signature = BaseContainerSignature & {
  Args: {
    minutely: RRuleGenerator['state']['data']['repeat']['minutely'];
  };
};

export default class ContainersRepeatDailyComponent extends BaseContainerComponent<Signature> {
  MinutelyInterval = MinutelyInterval;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.minutely.label'),
      every: translateLabel(this.args.translations, 'repeat.minutely.every'),
      minutes: translateLabel(
        this.args.translations,
        'repeat.minutely.minutes',
      ),
      which: translateLabel(this.args.translations, 'repeat.minutely.minutes'),
    };
  }

  <template>
    {{#let
      (hash
        Interval=(component
          this.MinutelyInterval
          id=(concat @id "-interval")
          value=@minutely.interval
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
      as |Minutely|
    }}
      {{#if (has-block)}}
        {{yield Minutely}}
      {{else}}
        {{#let (component @view) as |MinutelyComponent|}}
          <MinutelyComponent @Minutely={{Minutely}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
