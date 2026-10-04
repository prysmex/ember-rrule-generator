/**
 * Plain HTML "views" for the headless rrule generator. A real app would plug
 * in its own design-system components here.
 */
import Component from '@glimmer/component';
import { fn, get } from '@ember/helper';
import { on } from '@ember/modifier';
import type { TOC } from '@ember/component/template-only';

interface Option {
  value: string | number;
  label: string;
}

interface ChangeEvent {
  target: { value: unknown; name: string };
}

const isSelected = (a: unknown, b: unknown) => String(a) === String(b);

interface SelectSignature {
  Args: {
    id?: string;
    name: string;
    label?: string;
    value?: unknown;
    options: Option[];
    isDisabled?: boolean;
    handleChange: (e: Event) => void;
  };
}

export const Select: TOC<SelectSignature> = <template>
  <label class="field">
    {{#if @label}}<span>{{@label}}</span>{{/if}}
    <select
      id={{@id}}
      name={{@name}}
      disabled={{@isDisabled}}
      {{on "change" @handleChange}}
    >
      {{#each @options as |opt|}}
        <option
          value={{opt.value}}
          selected={{isSelected opt.value @value}}
        >{{opt.label}}</option>
      {{/each}}
    </select>
  </label>
</template>;

interface NumberInputSignature {
  Args: {
    id?: string;
    name: string;
    label?: string;
    value?: number;
    isDisabled?: boolean;
    handleChange: (e: Event) => void;
  };
}

export const NumberInput: TOC<NumberInputSignature> = <template>
  <label class="field">
    {{#if @label}}<span>{{@label}}</span>{{/if}}
    <input
      type="number"
      min="1"
      id={{@id}}
      name={{@name}}
      value={{@value}}
      disabled={{@isDisabled}}
      {{on "input" @handleChange}}
    />
  </label>
</template>;

interface WeekDaysSignature {
  Args: {
    name: string;
    days: [{ value: string; label: string }, boolean][];
    isDisabled?: boolean;
    handleChange: (isActive: boolean, e: Event) => void;
  };
}

export const WeekDays: TOC<WeekDaysSignature> = <template>
  <fieldset class="days" disabled={{@isDisabled}}>
    {{#each @days as |pair|}}
      {{#let (get pair "0") (get pair "1") as |day isActive|}}
        <label>
          <input
            type="checkbox"
            name="{{@name}}.{{day.value}}"
            checked={{isActive}}
            {{on "change" (fn @handleChange isActive)}}
          />
          {{day.label}}
        </label>
      {{/let}}
    {{/each}}
  </fieldset>
</template>;

interface DateInputSignature {
  Args: {
    name: string;
    label?: string;
    value?: Date | string | null;
    isDisabled?: boolean;
    handleChange: (e: ChangeEvent) => void;
  };
}

export class DateInput extends Component<DateInputSignature> {
  get value() {
    const { value } = this.args;
    if (!value) return '';
    return new Date(value).toISOString().slice(0, 10);
  }

  onChange = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    this.args.handleChange({
      target: {
        value: value ? new Date(`${value}T00:00:00Z`) : null,
        name: this.args.name,
      },
    });
  };

  <template>
    <label class="field">
      {{#if @label}}<span>{{@label}}</span>{{/if}}
      <input
        type="date"
        name={{@name}}
        value={{this.value}}
        disabled={{@isDisabled}}
        {{on "change" this.onChange}}
      />
    </label>
  </template>
}
