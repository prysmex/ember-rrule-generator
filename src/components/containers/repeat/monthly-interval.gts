import { hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.gts';
import numericalFieldHandler from '../../../utils/numerical-field-handler.ts';

export default class ContainersRepeatMonthlyIntervalComponent extends BaseContainerComponent {
  get numericalFieldHandler() {
    return numericalFieldHandler(this.args.handleChange);
  }

  <template>
    {{#if (has-block)}}
      {{yield
        (hash
          id=@id
          name=@name
          value=@value
          handleChange=this.numericalFieldHandler
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
        )
      }}
    {{else}}
      {{#if @view}}
        {{#let (component @view) as |MonthlyIntervalComponent|}}
          <MonthlyIntervalComponent
            @id={{@id}}
            id={{@id}}
            name={{@name}}
            @name={{@name}}
            @isDisabled={{@isDisabled}}
            @value={{@value}}
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
