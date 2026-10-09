import { concat, hash } from '@ember/helper';
import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';
import translateLabel from '../../../utils/translateLabel.js';
import ContainersEndSelectModeComponent from './select-mode.js';
import ContainersEndAfterComponent from './after.js';
import ContainersEndOnDateComponent from './on-date.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const isOptionAvailable = (option, options) => {
  return !options.modes || options.modes.indexOf(option) !== -1;
};
class ContainersEndIndexComponent extends Component {
  SelectMode = ContainersEndSelectModeComponent;
  OnDate = ContainersEndOnDateComponent;
  After = ContainersEndAfterComponent;
  get labels() {
    return {
      label: translateLabel(this.args.translations, 'end.label'),
      tooltip: translateLabel(this.args.translations, 'end.tooltip'),
      never: translateLabel(this.args.translations, 'end.never'),
      never_help: translateLabel(this.args.translations, 'end.never_help'),
      on_date: translateLabel(this.args.translations, 'end.on_date'),
      on_date_help: translateLabel(this.args.translations, 'end.on_date_help'),
      after: translateLabel(this.args.translations, 'end.after'),
      after_help: translateLabel(this.args.translations, 'end.after_help'),
      executions: translateLabel(this.args.translations, 'end.executions')
    };
  }
  get availableOptions() {
    const availableOptions = [];
    if (isOptionAvailable('Never', this.args.end.options)) {
      availableOptions.push({
        value: 'Never',
        label: translateLabel(this.args.translations, 'end.never')
      });
    }
    if (isOptionAvailable('After', this.args.end.options)) {
      availableOptions.push({
        value: 'After',
        label: translateLabel(this.args.translations, 'end.after')
      });
    }
    if (isOptionAvailable('On date', this.args.end.options)) {
      availableOptions.push({
        value: 'On date',
        label: translateLabel(this.args.translations, 'end.on_date')
      });
    }
    return availableOptions;
  }
  isOptionSelected = helper(function ([option, mode]) {
    return mode === option;
  });
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash Select=(component this.SelectMode id=(concat @id \"-select\") options=this.availableOptions value=@end.mode handleChange=@handleChange name=(concat @name \".mode\") translations=@translations labels=this.labels isDisabled=@isDisabled) After=(component this.After id=(concat @id \"-after\") after=@end.after handleChange=@handleChange name=(concat @name \".after\") translations=@translations labels=this.labels isDisabled=@isDisabled) OnDate=(component this.OnDate id=(concat @id \"-onDate\") onDate=@end.onDate handleChange=@handleChange name=(concat @name \".onDate\") translations=@translations labels=this.labels isDisabled=@isDisabled) isDisabled=@isDisabled labels=this.labels isNeverActive=(this.isOptionSelected \"Never\" @end.mode) isAfterActive=(this.isOptionSelected \"After\" @end.mode) isOnDateActive=(this.isOptionSelected \"On date\" @end.mode) name=@name handleChange=@handleChange translations=@translations) as |End|}}\n  {{#if (has-block)}}\n    {{yield End}}\n  {{else}}\n    {{#let (component @view) as |EndComponent|}}\n      <EndComponent @End={{End}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        concat
      })
    }), this);
  }
}

export { ContainersEndIndexComponent as default };
//# sourceMappingURL=index.js.map
