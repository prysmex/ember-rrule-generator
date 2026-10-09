import { hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import type RRuleGenerator from '../../r-rule-generator/index.gts';
import translateLabel from '../../../utils/translateLabel.ts';

type Signature = BaseContainerSignature & {
  Args: {
    timezone: RRuleGenerator['state']['data']['timezone'] & {
      tzid?: string;
    };
  };
};

export default class ContainersTimezoneSelectComponent extends BaseContainerComponent<Signature> {
  get options() {
    const opts = this.args.timezone.options.supportedTimezones?.() || [];
    const results = opts.map((opt) => {
      return {
        value: opt,
        label: opt,
      };
    });
    results.unshift({
      value: '',
      label: translateLabel(this.args.translations, 'timezone.local') as string,
    });
    return results;
  }

  <template>
    {{#if (has-block)}}
      {{yield
        (hash
          handleChange=@handleChange
          timezone=@timezone
          id=@id
          value=@timezone.tzid
          options=this.options
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
          name=@name
        )
      }}
    {{else}}
      {{#if @view}}
        {{#let (component @view) as |TimezoneSelectComponent|}}
          <TimezoneSelectComponent
            @id={{@id}}
            id={{@id}}
            @name={{@name}}
            name={{@name}}
            @timezone={{@timezone}}
            @value={{@timezone.tzid}}
            @options={{this.options}}
            @handleChange={{@handleChange}}
            @translations={{@translations}}
            @labels={{@labels}}
            @isDisabled={{@isDisabled}}
            ...attributes
          />
        {{/let}}
      {{/if}}
    {{/if}}
  </template>
}
