import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersStartOnDateComponent from './on-date.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersStartComponent extends BaseContainerComponent {
  OnDate = ContainersStartOnDateComponent;
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'start.label'),
      on: translateLabel(this.args.translations, 'start.on')
    };
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash OnDate=(component this.OnDate id=(concat @id \"-onDate\") onDate=@start.onDate handleChange=@handleChange name=(concat @name \".onDate\") translations=@translations labels=this.labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=this.labels) as |Start|}}\n  {{#if (has-block)}}\n    {{yield Start}}\n  {{else}}\n    {{#let (component @view) as |StartComponent|}}\n      <StartComponent @Start={{Start}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
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
