import { hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersTimezoneSelectComponent extends BaseContainerComponent {
  get options() {
    const opts = this.args.timezone.options.supportedTimezones?.() || [];
    const results = opts.map(opt => {
      return {
        value: opt,
        label: opt
      };
    });
    results.unshift({
      value: '',
      label: translateLabel(this.args.translations, 'timezone.local')
    });
    return results;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash handleChange=@handleChange timezone=@timezone id=@id value=@timezone.tzid options=this.options translations=@translations labels=@labels isDisabled=@isDisabled name=@name)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |TimezoneSelectComponent|}}\n      <TimezoneSelectComponent @id={{@id}} id={{@id}} @name={{@name}} name={{@name}} @timezone={{@timezone}} @value={{@timezone.tzid}} @options={{this.options}} @handleChange={{@handleChange}} @translations={{@translations}} @labels={{@labels}} @isDisabled={{@isDisabled}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersTimezoneSelectComponent as default };
//# sourceMappingURL=timezone-select.js.map
