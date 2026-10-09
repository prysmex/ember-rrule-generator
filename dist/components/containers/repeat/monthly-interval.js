import { hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import numericalFieldHandler from '../../../utils/numerical-field-handler.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatMonthlyIntervalComponent extends BaseContainerComponent {
  get numericalFieldHandler() {
    return numericalFieldHandler(this.args.handleChange);
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash id=@id name=@name value=@value handleChange=this.numericalFieldHandler translations=@translations labels=@labels isDisabled=@isDisabled)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |MonthlyIntervalComponent|}}\n      <MonthlyIntervalComponent @id={{@id}} id={{@id}} name={{@name}} @name={{@name}} @isDisabled={{@isDisabled}} @value={{@value}} @handleChange={{this.numericalFieldHandler}} @translations={{@translations}} @labels={{@labels}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersRepeatMonthlyIntervalComponent as default };
//# sourceMappingURL=monthly-interval.js.map
