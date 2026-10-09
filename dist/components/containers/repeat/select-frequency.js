import { hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatSelectFrequencyComponent extends BaseContainerComponent {
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash options=@options handleChange=this.handleChange value=@value id=@id translations=@translations name=@name labels=@labels isDisabled=@isDisabled)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |SelectComponent|}}\n      <SelectComponent @id={{@id}} id={{@id}} name={{@name}} @name={{@name}} @isDisabled={{@isDisabled}} @options={{@options}} @value={{@value}} @handleChange={{this.handleChange}} @translations={{@translations}} @labels={{@labels}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersRepeatSelectFrequencyComponent as default };
//# sourceMappingURL=select-frequency.js.map
