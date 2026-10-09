import { concat, hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';
import type RRuleGenerator from '../../r-rule-generator/index.gts';

type Signature = BaseContainerSignature & {
  Args: {
    onDate: RRuleGenerator['state']['data']['end']['onDate'] & {
      date?: Date | string | null;
    };
  };
};

export default class ContainersEndOnDateComponent extends BaseContainerComponent<Signature> {
  <template>
    {{#if (has-block)}}
      {{yield
        (hash
          handleChange=@handleChange
          onDate=@onDate
          value=@onDate.date
          id=@id
          name=(concat @name ".date")
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
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
            @isDisabled={{@isDisabled}}
            @handleChange={{@handleChange}}
            @translations={{@translations}}
            @labels={{@labels}}
            ...attributes
          />
        {{/let}}
      {{/if}}
    {{/if}}
  </template>
}
