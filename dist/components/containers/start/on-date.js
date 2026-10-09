import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersStartOnDateComponent extends BaseContainerComponent {
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash handleChange=@handleChange onDate=@onDate value=@onDate.date id=@id translations=@translations labels=@labels isDisabled=@isDisabled name=@name)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |OnDateComponent|}}\n      <OnDateComponent @id={{@id}} id={{@id}} @name={{concat @name \".date\"}} name={{concat @name \".date\"}} @value={{@onDate.date}} @onDate={{@onDate}} @handleChange={{@handleChange}} @translations={{@translations}} @labels={{@labels}} @isDisabled={{@isDisabled}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersStartOnDateComponent as default };
//# sourceMappingURL=on-date.js.map
