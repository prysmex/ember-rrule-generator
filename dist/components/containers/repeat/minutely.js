import { concat, hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import ContainersRepeatMinutelyIntervalComponent from './minutely-interval.js';
import translateLabel from '../../../utils/translateLabel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatDailyComponent extends BaseContainerComponent {
  MinutelyInterval = ContainersRepeatMinutelyIntervalComponent;
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'repeat.minutely.label'),
      every: translateLabel(this.args.translations, 'repeat.minutely.every'),
      minutes: translateLabel(this.args.translations, 'repeat.minutely.minutes'),
      which: translateLabel(this.args.translations, 'repeat.minutely.minutes')
    };
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Interval=(component this.MinutelyInterval id=(concat @id \"-interval\") value=@minutely.interval handleChange=@handleChange name=(concat @name \".interval\") translations=@translations labels=this.labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=this.labels name=@name handleChange=@handleChange translations=@translations) as |Minutely|}}\n  {{#if (has-block)}}\n    {{yield Minutely}}\n  {{else}}\n    {{#let (component @view) as |MinutelyComponent|}}\n      <MinutelyComponent @Minutely={{Minutely}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersRepeatDailyComponent as default };
//# sourceMappingURL=minutely.js.map
