import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import type RRuleGenerator from '../../r-rule-generator/index.gts';

type Signature = BaseContainerSignature & {
  Args: {
    onDate: RRuleGenerator['state']['data']['start']['onDate'];
  };
};

export default class ContainersStartOnDateComponent extends BaseContainerComponent<Signature> {
  <template>
    {{#if (has-block)}}
      {{yield
        (hash
          handleChange=@handleChange
          onDate=@onDate
          value=@onDate.date
          id=@id
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
          name=@name
        )
      }}
    {{else}}
      {{#if @view}}
        {{#let (component @view) as |OnDateComponent|}}
          <OnDateComponent
            @id={{@id}}
            id={{@id}}
            @name={{concat @name ".date"}}
            name={{concat @name ".date"}}
            @value={{@onDate.date}}
            @onDate={{@onDate}}
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
