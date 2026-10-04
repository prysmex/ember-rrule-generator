import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';

import type RRuleGenerator from '../../r-rule-generator/index.gts';
import OnDate from './on-date.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type Signature = BaseContainerSignature & {
  Args: {
    start: RRuleGenerator['state']['data']['start'];
  };
};

export default class ContainersStartComponent extends BaseContainerComponent<Signature> {
  OnDate = OnDate;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'start.label'),
      on: translateLabel(this.args.translations, 'start.on'),
    };
  }

  <template>
    {{#let
      (hash
        OnDate=(component
          this.OnDate
          id=(concat @id "-onDate")
          onDate=@start.onDate
          handleChange=@handleChange
          name=(concat @name ".onDate")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
        labels=this.labels
      )
      as |Start|
    }}
      {{#if (has-block)}}
        {{yield Start}}
      {{else}}
        {{#let (component @view) as |StartComponent|}}
          <StartComponent @Start={{Start}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
