import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';

import type RRuleGenerator from '../../r-rule-generator/index.gts';
import TimezoneSelect from './timezone-select.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type Signature = BaseContainerSignature & {
  Args: {
    timezone: RRuleGenerator['state']['data']['timezone'];
  };
};

export default class ContainersStartComponent extends BaseContainerComponent<Signature> {
  TimezoneSelect = TimezoneSelect;

  get labels() {
    return {
      label: translateLabel(this.args.translations, 'timezone.label'),
    };
  }

  <template>
    {{#let
      (hash
        Select=(component
          this.TimezoneSelect
          id=(concat @id "-timezone")
          timezone=@timezone
          handleChange=@handleChange
          name=(concat @name ".tzid")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
        labels=this.labels
      )
      as |Select|
    }}
      {{#if (has-block)}}
        {{yield Select}}
      {{else}}
        {{#let (component @view) as |SelectComponent|}}
          <SelectComponent @Select={{Select}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
