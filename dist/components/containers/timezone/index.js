import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersTimezoneSelectComponent from './timezone-select.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersStartComponent extends BaseContainerComponent {
  TimezoneSelect = ContainersTimezoneSelectComponent;
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'timezone.label')
    };
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Select=(component this.TimezoneSelect id=(concat @id \"-timezone\") timezone=@timezone handleChange=@handleChange name=(concat @name \".tzid\") translations=@translations labels=this.labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=this.labels) as |Select|}}\n  {{#if (has-block)}}\n    {{yield Select}}\n  {{else}}\n    {{#let (component @view) as |SelectComponent|}}\n      <SelectComponent @Select={{Select}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersStartComponent as default };
//# sourceMappingURL=index.js.map
