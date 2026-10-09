import { hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import numericalFieldHandler from '../../../utils/numerical-field-handler.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersEndAfterComponent extends BaseContainerComponent {
  get numericalFieldHandler() {
    return numericalFieldHandler(this.args.handleChange);
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash handleChange=this.numericalFieldHandler value=@after id=@id name=@name translations=@translations labels=@labels isDisabled=@isDisabled)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |AfterComponent|}}\n      <AfterComponent @id={{@id}} id={{@id}} @name={{@name}} @isDisabled={{@isDisabled}} name={{@name}} @value={{@after}} @handleChange={{this.numericalFieldHandler}} @translations={{@translations}} @labels={{@labels}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersEndAfterComponent as default };
//# sourceMappingURL=after.js.map
