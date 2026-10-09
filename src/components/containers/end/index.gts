import { concat, hash } from '@ember/helper';
import { helper } from '@ember/component/helper';
import type { BaseContainerSignature } from '../base-container.gts';
import Component from '@glimmer/component';

import type RRuleGenerator from '../../r-rule-generator/index.gts';
import type { EndValue } from '../../r-rule-generator/index.gts';
import translateLabel from '../../../utils/translateLabel.ts';

import SelectMode from './select-mode.gts';
import After from './after.gts';
import OnDate from './on-date.gts';

type End = RRuleGenerator['state']['data']['end'];

type Signature = BaseContainerSignature & {
  Args: {
    end: End;
  };
};

const isOptionAvailable = (option: EndValue, options: End['options']) => {
  return !options.modes || options.modes.indexOf(option) !== -1;
};

export default class ContainersEndIndexComponent extends Component<Signature> {
  SelectMode = SelectMode;
  OnDate = OnDate;
  After = After;

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
      executions: translateLabel(this.args.translations, 'end.executions'),
    };
  }

  get availableOptions() {
    const availableOptions: {
      value: EndValue;
      label: string | null;
    }[] = [];

    if (isOptionAvailable('Never', this.args.end.options)) {
      availableOptions.push({
        value: 'Never',
        label: translateLabel(this.args.translations, 'end.never'),
      });
    }
    if (isOptionAvailable('After', this.args.end.options)) {
      availableOptions.push({
        value: 'After',
        label: translateLabel(this.args.translations, 'end.after'),
      });
    }
    if (isOptionAvailable('On date', this.args.end.options)) {
      availableOptions.push({
        value: 'On date',
        label: translateLabel(this.args.translations, 'end.on_date'),
      });
    }

    return availableOptions;
  }

  isOptionSelected = helper(function ([option, mode]: [
    EndValue,
    End['mode'] | undefined,
  ]) {
    return mode === option;
  });

  <template>
    {{#let
      (hash
        Select=(component
          this.SelectMode
          id=(concat @id "-select")
          options=this.availableOptions
          value=@end.mode
          handleChange=@handleChange
          name=(concat @name ".mode")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        After=(component
          this.After
          id=(concat @id "-after")
          after=@end.after
          handleChange=@handleChange
          name=(concat @name ".after")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        OnDate=(component
          this.OnDate
          id=(concat @id "-onDate")
          onDate=@end.onDate
          handleChange=@handleChange
          name=(concat @name ".onDate")
          translations=@translations
          labels=this.labels
          isDisabled=@isDisabled
        )
        isDisabled=@isDisabled
        labels=this.labels
        isNeverActive=(this.isOptionSelected "Never" @end.mode)
        isAfterActive=(this.isOptionSelected "After" @end.mode)
        isOnDateActive=(this.isOptionSelected "On date" @end.mode)
        name=@name
        handleChange=@handleChange
        translations=@translations
      )
      as |End|
    }}
      {{#if (has-block)}}
        {{yield End}}
      {{else}}
        {{#let (component @view) as |EndComponent|}}
          <EndComponent @End={{End}} ...attributes />
        {{/let}}
      {{/if}}
    {{/let}}
  </template>
}
