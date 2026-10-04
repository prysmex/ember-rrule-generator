import { hash } from '@ember/helper';
import numericalFieldHandler from '../../../utils/numerical-field-handler.ts';
import BaseContainerComponent from '../base-container.gts';

export default class ContainersRepeatDailyIntervalComponent extends BaseContainerComponent {
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
        {{#let (component @view) as |DailyIntervalComponent|}}
          <DailyIntervalComponent
            @id={{@id}}
            id={{@id}}
            name={{@name}}
            @name={{@name}}
            @value={{@value}}
            @handleChange={{this.numericalFieldHandler}}
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
