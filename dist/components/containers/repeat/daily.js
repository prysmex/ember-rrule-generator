import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersRepeatDailyIntervalComponent from './daily-interval.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatDailyComponent extends BaseContainerComponent {
  DailyInterval = ContainersRepeatDailyIntervalComponent;
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.daily.label'),
      every: translateLabel(this.args.translations, 'repeat.daily.every'),
      days: translateLabel(this.args.translations, 'repeat.daily.days'),
      which: translateLabel(this.args.translations, 'repeat.daily.days')
    };
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Interval=(component this.DailyInterval id=(concat @id \"-interval\") value=@daily.interval handleChange=@handleChange name=(concat @name \".interval\") translations=@translations labels=this.labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=this.labels name=@name handleChange=@handleChange translations=@translations) as |Daily|}}\n  {{#if (has-block)}}\n    {{yield Daily}}\n  {{else}}\n    {{#let (component @view) as |DailyComponent|}}\n      <DailyComponent @Daily={{Daily}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatDailyComponent as default };
//# sourceMappingURL=daily.js.map
