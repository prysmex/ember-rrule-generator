import { hash } from '@ember/helper';
import numericalFieldHandler from '../../../utils/numerical-field-handler.js';
import BaseContainerComponent from '../base-container.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatDailyIntervalComponent extends BaseContainerComponent {
  get numericalFieldHandler() {
    return numericalFieldHandler(this.args.handleChange);
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash id=@id name=@name value=@value handleChange=this.numericalFieldHandler translations=@translations labels=@labels isDisabled=@isDisabled)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |DailyIntervalComponent|}}\n      <DailyIntervalComponent @id={{@id}} id={{@id}} name={{@name}} @name={{@name}} @value={{@value}} @handleChange={{this.numericalFieldHandler}} @translations={{@translations}} @labels={{@labels}} @isDisabled={{@isDisabled}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersRepeatDailyIntervalComponent as default };
//# sourceMappingURL=daily-interval.js.map
