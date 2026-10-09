import { hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatMonthlyOnTheDayComponent extends BaseContainerComponent {
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash id=@id name=@name value=@value options=@options isActive=@isActive handleChange=this.handleChange translations=@translations labels=@labels isDisabled=@isDisabled)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |MonthlyOnTheDayComponent|}}\n      <MonthlyOnTheDayComponent @id={{@id}} id={{@id}} name={{@name}} @name={{@name}} @value={{@value}} @options={{@options}} @isDisabled={{@isDisabled}} @isActive={{@isActive}} @handleChange={{this.handleChange}} @translations={{@translations}} @labels={{@labels}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersRepeatMonthlyOnTheDayComponent as default };
//# sourceMappingURL=monthly-on-the-day.js.map
