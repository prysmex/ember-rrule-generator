import { hash } from '@ember/helper';
import type { ChangeEvent } from '../../r-rule-generator/index.gts';
import BaseContainerComponent, {
  type BaseContainerSignature,
} from '../base-container.gts';

type Signature = BaseContainerSignature & {
  Args: {
    days?: unknown[];
  };
};

export default class ContainersRepeatWeeklyDaysComponent extends BaseContainerComponent<Signature> {
  onDaysChange = (isDayActive: boolean, e: ChangeEvent) => {
    const editedEvent = {
      ...e,
      target: {
        ...e.target,
        value: !isDayActive,
        name: e.target.name,
      },
    };

    this.args.handleChange(editedEvent);
  };

  <template>
    {{#if (has-block)}}
      {{yield
        (hash
          id=@id
          name=@name
          value=@value
          handleChange=this.onDaysChange
          translations=@translations
          labels=@labels
          isDisabled=@isDisabled
        )
      }}
    {{else}}
      {{#if @view}}
        {{#let (component @view) as |WeeklyIntervalComponent|}}
          <WeeklyIntervalComponent
            @id={{@id}}
            id={{@id}}
            name={{@name}}
            @name={{@name}}
            @value={{@value}}
            @isDisabled={{@isDisabled}}
            @days={{@days}}
            @handleChange={{this.onDaysChange}}
            @translations={{@translations}}
            @labels={{@labels}}
            ...attributes
          />
        {{/let}}
      {{/if}}
    {{/if}}
  </template>
}
