import { hash } from '@ember/helper';
import numericalFieldHandler from '../../../utils/numerical-field-handler.js';
import BaseContainerComponent from '../base-container.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatHourlyIntervalComponent extends BaseContainerComponent {
  get numericalFieldHandler() {
    return numericalFieldHandler(this.args.handleChange);
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash id=@id name=@name value=@value handleChange=this.numericalFieldHandler translations=@translations labels=@labels isDisabled=@isDisabled)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |HourlyIntervalComponent|}}\n      <HourlyIntervalComponent @id={{@id}} id={{@id}} name={{@name}} @name={{@name}} @isDisabled={{@isDisabled}} @value={{@value}} @handleChange={{this.numericalFieldHandler}} @translations={{@translations}} @labels={{@labels}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersRepeatHourlyIntervalComponent as default };
//# sourceMappingURL=hourly-interval.js.map
