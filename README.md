# ember-rrule-generator

Headless [RRULE](https://datatracker.ietf.org/doc/html/rfc5545#section-3.3.10) generator components for Ember.

The addon owns the state and the rrule (de)serialization (via
[`rrule`](https://github.com/jkbrzt/rrule)); you bring the UI. Every piece of
the generator either yields its state to a block or renders a `@view`
component you pass in.

## Compatibility

- Ember.js v5.8 or above
- Embroider or ember-auto-import v2

## Installation

```sh
pnpm add ember-rrule-generator rrule dayjs lodash-es
```

`rrule`, `dayjs` and `lodash-es` are peer dependencies.

## Usage

```gjs
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { RRuleGenerator } from 'ember-rrule-generator';

import { Select, NumberInput, DateInput, WeekDays } from './my-views';

export default class Recurrence extends Component {
  @tracked rule = 'RRULE:FREQ=DAILY;INTERVAL=1';

  changeRule = (rule) => (this.rule = rule);

  <template>
    <RRuleGenerator
      @value={{this.rule}}
      @onChange={{this.changeRule}}
      as |Generator|
    >
      <Generator.Start as |Start|>
        <Start.OnDate @view={{DateInput}} />
      </Generator.Start>

      <Generator.Repeat as |Repeat|>
        <Repeat.Select @view={{Select}} />
        {{#if Repeat.isWeeklyActive}}
          <Repeat.Weekly as |Weekly|>
            <Weekly.Interval @view={{NumberInput}} />
            <Weekly.Days @view={{WeekDays}} />
          </Repeat.Weekly>
        {{/if}}
        {{! ...Yearly, Monthly, Daily, Hourly, Minutely }}
      </Generator.Repeat>

      <Generator.End as |End|>
        <End.Select @view={{Select}} />
        {{#if End.isOnDateActive}}
          <End.OnDate @view={{DateInput}} />
        {{else if End.isAfterActive}}
          <End.After @view={{NumberInput}} />
        {{/if}}
      </Generator.End>
    </RRuleGenerator>
  </template>
}
```

A view receives `@name`, `@value`, `@handleChange`, `@options` (for selects),
`@labels`, `@translations` and `@isDisabled`. See
[`demo-app/components/views.gts`](./demo-app/components/views.gts) for
complete, minimal examples.

The component is also available at
`ember-rrule-generator/components/r-rule-generator`, and as
`<RRuleGenerator>` in loose-mode templates.

### Arguments

| Argument        | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `@value`        | The rrule string to display.                                   |
| `@onChange`     | Called with the new rrule string whenever the user changes it. |
| `@config`       | Restrict frequencies/end modes, week start, timezones, etc.    |
| `@translations` | An object (see `src/translations/en.js`) or `(key) => string`. |
| `@isDisabled`   | Passed down to every view.                                     |
| `@id`           | Prefix for the generated element ids.                          |

### Glint

Loose-mode apps can register the component with Glint:

```ts
import type RRuleGeneratorRegistry from 'ember-rrule-generator/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends RRuleGeneratorRegistry {}
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide. Releases are managed by
[release-plan](./RELEASE.md).

## License

This project is licensed under the [MIT License](LICENSE.md).
