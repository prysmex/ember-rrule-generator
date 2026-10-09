import { hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersEndSelectModeComponent extends BaseContainerComponent {
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash options=@options handleChange=this.handleChange value=@value id=@id name=@name translations=@translations labels=@labels isDisabled=@isDisabled)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |SelectComponent|}}\n      <SelectComponent @id={{@id}} id={{@id}} @name={{@name}} name={{@name}} @isDisabled={{@isDisabled}} @options={{@options}} @value={{@value}} @handleChange={{this.handleChange}} @translations={{@translations}} @labels={{@labels}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersEndSelectModeComponent as default };
//# sourceMappingURL=select-mode.js.map
