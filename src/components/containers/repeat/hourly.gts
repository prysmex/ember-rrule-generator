import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import type RRuleGenerator from '../../r-rule-generator/index.gts';

import HourlyInterval from './hourly-interval.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type Signature = BaseContainerSignature & {
  Args: {
    hourly: RRuleGenerator['state']['data']['repeat']['hourly'];
  };
};

export default class ContainersRepeatHourlyComponent extends BaseContainerComponent<Signature> {
  HourlyInterval = HourlyInterval;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.hourly.every'),
      every: translateLabel(this.args.translations, 'repeat.hourly.every'),
      hours: translateLabel(this.args.translations, 'repeat.hourly.hours'),
      which: translateLabel(this.args.translations, 'repeat.hourly.hours'),
    };
  }

  <template>
    {{#let
      (hash
        Interval=(component
          this.HourlyInterval
          id=(concat @id "-interval")
          value=@hourly.interval
          handleChange=@handleChange
          name=(concat @name ".interval")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        labels=this.labels
        isDisabled=@isDisabled
        handleChange=this.handleChange
        translations=@translations
        name=@name
      )
      as |Hourly|
    }}
      {{#if (has-block)}}
        {{yield Hourly}}
      {{else}}
        {{#let (component @view) as |HourlyComponent|}}
          <HourlyComponent @Hourly={{Hourly}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
