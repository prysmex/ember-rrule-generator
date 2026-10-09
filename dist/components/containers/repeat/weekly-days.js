import { hash } from '@ember/helper';
import BaseContainerComponent from '../base-container.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class ContainersRepeatWeeklyDaysComponent extends BaseContainerComponent {
  onDaysChange = (isDayActive, e) => {
    const editedEvent = {
      ...e,
      target: {
        ...e.target,
        value: !isDayActive,
        name: e.target.name
      }
    };
    this.args.handleChange(editedEvent);
  };
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block)}}\n  {{yield (hash id=@id name=@name value=@value handleChange=this.onDaysChange translations=@translations labels=@labels isDisabled=@isDisabled)}}\n{{else}}\n  {{#if @view}}\n    {{#let (component @view) as |WeeklyIntervalComponent|}}\n      <WeeklyIntervalComponent @id={{@id}} id={{@id}} name={{@name}} @name={{@name}} @value={{@value}} @isDisabled={{@isDisabled}} @days={{@days}} @handleChange={{this.onDaysChange}} @translations={{@translations}} @labels={{@labels}} ...attributes />\n    {{/let}}\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
}

export { ContainersRepeatWeeklyDaysComponent as default };
//# sourceMappingURL=weekly-days.js.map
