import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersRepeatHourlyIntervalComponent from './hourly-interval.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatHourlyComponent extends BaseContainerComponent {
  HourlyInterval = ContainersRepeatHourlyIntervalComponent;
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.hourly.every'),
      every: translateLabel(this.args.translations, 'repeat.hourly.every'),
      hours: translateLabel(this.args.translations, 'repeat.hourly.hours'),
      which: translateLabel(this.args.translations, 'repeat.hourly.hours')
    };
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Interval=(component this.HourlyInterval id=(concat @id \"-interval\") value=@hourly.interval handleChange=@handleChange name=(concat @name \".interval\") translations=@translations labels=this.labels isDisabled=@isDisabled) labels=this.labels isDisabled=@isDisabled handleChange=this.handleChange translations=@translations name=@name) as |Hourly|}}\n  {{#if (has-block)}}\n    {{yield Hourly}}\n  {{else}}\n    {{#let (component @view) as |HourlyComponent|}}\n      <HourlyComponent @Hourly={{Hourly}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatHourlyComponent as default };
//# sourceMappingURL=hourly.js.map
