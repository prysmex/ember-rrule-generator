import { hash } from '@ember/helper';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';

import numericalFieldHandler from '../../../utils/numerical-field-handler.ts';

type Signature = BaseContainerSignature & {
  Args: {
    after: number;
  };
};

export default class ContainersEndAfterComponent extends BaseContainerComponent<Signature> {
  get numericalFieldHandler() {
    return numericalFieldHandler(this.args.handleChange);
  }

  <template>
    {{#if (has-block)}}
      {{yield
        (hash
          handleChange=this.numericalFieldHandler
          value=@after
          id=@id
          name=@name
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
        )
      }}
    {{else}}
      {{#if @view}}
        {{#let (component @view) as |AfterComponent|}}
          <AfterComponent
            @id={{@id}}
            id={{@id}}
            @name={{@name}}
            @isDisabled={{@isDisabled}}
            name={{@name}}
            @value={{@after}}
            @handleChange={{this.numericalFieldHandler}}
            @translations={{@translations}}
            @labels={{@labels}}
            ...attributes
          />
        {{/let}}
      {{/if}}
    {{/if}}
  </template>
}
