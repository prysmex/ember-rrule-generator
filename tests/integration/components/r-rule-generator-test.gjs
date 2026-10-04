import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render, settled } from '@ember/test-helpers';
import { fn, get } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import RRuleGenerator from '#src/components/r-rule-generator/index.gts';

const START = 'DTSTART:20220101T000000Z';

/*
 * Minimal "view" components, the way a consumer of this headless addon
 * would write them.
 */
const isSelected = (a, b) => String(a) === String(b);

const TestSelect = <template>
  <select name={{@name}} disabled={{@isDisabled}} {{on "change" @handleChange}}>
    {{#each @options as |opt|}}
      <option
        value={{opt.value}}
        selected={{isSelected opt.value @value}}
      >{{opt.label}}</option>
    {{/each}}
  </select>
</template>;

const TestNumber = <template>
  <input
    type="number"
    name={{@name}}
    value={{@value}}
    disabled={{@isDisabled}}
    {{on "input" @handleChange}}
  />
</template>;

const TestDays = <template>
  {{#each @days as |pair|}}
    {{#let (get pair "0") (get pair "1") as |day isActive|}}
      <label>
        <input
          type="checkbox"
          name="{{@name}}.{{day.value}}"
          checked={{isActive}}
          disabled={{@isDisabled}}
          {{on "change" (fn @handleChange isActive)}}
        />
        {{day.label}}
      </label>
    {{/let}}
  {{/each}}
</template>;

class TestDate extends Component {
  setDate = (iso) => {
    this.args.handleChange({
      target: { value: iso ? new Date(iso) : null, name: this.args.name },
    });
  };

  <template>
    <output data-test-date={{@name}}>{{if @value "set" "empty"}}</output>
    <button
      type="button"
      data-test-set-date={{@name}}
      {{on "click" (fn this.setDate "2022-12-31T00:00:00Z")}}
    >set</button>
    <button
      type="button"
      data-test-clear-date={{@name}}
      {{on "click" (fn this.setDate null)}}
    >clear</button>
  </template>
}

const DailyView = <template><@Daily.Interval @view={{TestNumber}} /></template>;

class RepeatView extends Component {
  get repeat() {
    return this.args.Repeat;
  }

  <template>
    <div data-test-repeat-view>
      <@Repeat.Select @view={{TestSelect}} />
      {{#if this.repeat.isDailyActive}}
        <@Repeat.Daily @view={{DailyView}} />
      {{/if}}
    </div>
  </template>
}

class State {
  @tracked value = `${START}\nRRULE:FREQ=DAILY;INTERVAL=1`;
  @tracked config = {
    supportedTimezones: () => ['UTC', 'America/Monterrey'],
  };
  @tracked translations;
  @tracked isDisabled;
  changes = [];

  onChange = (rrule) => {
    this.changes.push(rrule);
    this.value = rrule;
  };

  lastChange = () => this.changes[this.changes.length - 1];
}

const Full = <template>
  <RRuleGenerator
    @value={{@state.value}}
    @onChange={{@state.onChange}}
    @config={{@state.config}}
    @translations={{@state.translations}}
    @isDisabled={{@state.isDisabled}}
    as |Generator|
  >
    <Generator.Timezone as |Timezone|>
      <Timezone.Select @view={{TestSelect}} />
    </Generator.Timezone>
    <Generator.Start as |Start|>
      <Start.OnDate @view={{TestDate}} />
    </Generator.Start>
    <Generator.Repeat as |Repeat|>
      <Repeat.Select @view={{TestSelect}} />
      {{#if Repeat.isYearlyActive}}
        <Repeat.Yearly as |Yearly|>
          <Yearly.Interval @view={{TestNumber}} />
          <Yearly.Select @view={{TestSelect}} />
          {{#if Yearly.isOnActive}}
            <Yearly.On as |On|>
              <On.Month @view={{TestSelect}} />
              <On.Day @view={{TestSelect}} />
            </Yearly.On>
          {{/if}}
          {{#if Yearly.isOnTheActive}}
            <Yearly.OnThe as |OnThe|>
              <OnThe.Which @view={{TestSelect}} />
              <OnThe.Day @view={{TestSelect}} />
              <OnThe.Month @view={{TestSelect}} />
            </Yearly.OnThe>
          {{/if}}
        </Repeat.Yearly>
      {{/if}}
      {{#if Repeat.isMonthlyActive}}
        <Repeat.Monthly as |Monthly|>
          <Monthly.Interval @view={{TestNumber}} />
          <Monthly.Select @view={{TestSelect}} />
          {{#if Monthly.isOnActive}}
            <Monthly.On as |On|>
              <On.Day @view={{TestSelect}} />
            </Monthly.On>
          {{/if}}
          {{#if Monthly.isOnTheActive}}
            <Monthly.OnThe as |OnThe|>
              <OnThe.Which @view={{TestSelect}} />
              <OnThe.Day @view={{TestSelect}} />
            </Monthly.OnThe>
          {{/if}}
        </Repeat.Monthly>
      {{/if}}
      {{#if Repeat.isWeeklyActive}}
        <Repeat.Weekly as |Weekly|>
          <Weekly.Interval @view={{TestNumber}} />
          <Weekly.Days @view={{TestDays}} />
        </Repeat.Weekly>
      {{/if}}
      {{#if Repeat.isDailyActive}}
        <Repeat.Daily as |Daily|>
          <Daily.Interval @view={{TestNumber}} />
        </Repeat.Daily>
      {{/if}}
      {{#if Repeat.isHourlyActive}}
        <Repeat.Hourly as |Hourly|>
          <Hourly.Interval @view={{TestNumber}} />
        </Repeat.Hourly>
      {{/if}}
      {{#if Repeat.isMinutelyActive}}
        <Repeat.Minutely as |Minutely|>
          <Minutely.Interval @view={{TestNumber}} />
        </Repeat.Minutely>
      {{/if}}
    </Generator.Repeat>
    <Generator.End as |End|>
      <End.Select @view={{TestSelect}} />
      {{#if End.isOnDateActive}}
        <End.OnDate @view={{TestDate}} />
      {{else if End.isAfterActive}}
        <End.After @view={{TestNumber}} />
      {{/if}}
    </Generator.End>
  </RRuleGenerator>
</template>;

function optionValues(selector) {
  return [...document.querySelectorAll(`${selector} option`)].map(
    (o) => o.value,
  );
}

function optionLabels(selector) {
  return [...document.querySelectorAll(`${selector} option`)].map((o) =>
    o.textContent.trim(),
  );
}

module('Integration | Component | r-rule-generator', function (hooks) {
  setupRenderingTest(hooks);

  // templates may only reference `const` bindings
  const ctx = {};
  let state;

  hooks.beforeEach(function () {
    state = ctx.state = new State();
  });

  test('renders the state described by @value', async function (assert) {
    state.value = `${START}\nRRULE:FREQ=DAILY;INTERVAL=2;COUNT=3`;
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.dom('select[name="repeat.frequency"]').hasValue('Daily');
    assert.deepEqual(optionValues('select[name="repeat.frequency"]'), [
      'Yearly',
      'Monthly',
      'Weekly',
      'Daily',
      'Hourly',
      'Minutely',
    ]);
    assert.deepEqual(optionLabels('select[name="repeat.frequency"]'), [
      'Yearly',
      'Monthly',
      'Weekly',
      'Daily',
      'Hourly',
      'Minutely',
    ]);
    assert.dom('input[name="repeat.daily.interval"]').hasValue('2');
    assert.dom('select[name="repeat.yearly.mode"]').doesNotExist();
    assert.dom('select[name="end.mode"]').hasValue('After');
    assert.dom('input[name="end.after"]').hasValue('3');
    assert.dom('[data-test-date="start.onDate.date"]').hasText('set');
    assert.deepEqual(state.changes, [], 'does not emit on render');
  });

  test('re-renders when @value changes from the outside', async function (assert) {
    await render(<template><Full @state={{ctx.state}} /></template>);
    assert.dom('select[name="repeat.frequency"]').hasValue('Daily');

    state.value = `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU`;
    await settled();

    assert.dom('select[name="repeat.frequency"]').hasValue('Weekly');
    assert.dom('input[name="repeat.weekly.days.tue"]').isChecked();
    assert.dom('input[name="repeat.weekly.days.mon"]').isNotChecked();
  });

  test('changing frequency emits a new rrule', async function (assert) {
    await render(<template><Full @state={{ctx.state}} /></template>);

    await fillIn('select[name="repeat.frequency"]', 'Hourly');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=HOURLY;INTERVAL=1`,
    );
    assert.dom('input[name="repeat.hourly.interval"]').exists();

    await fillIn('select[name="repeat.frequency"]', 'Minutely');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=MINUTELY;INTERVAL=1`,
    );
  });

  test('daily interval', async function (assert) {
    await render(<template><Full @state={{ctx.state}} /></template>);

    await fillIn('input[name="repeat.daily.interval"]', '5');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=5`,
    );

    const count = state.changes.length;
    await fillIn('input[name="repeat.daily.interval"]', '1000');
    assert.strictEqual(state.changes.length, count, 'ignores values >= 1000');
  });

  test('weekly interval and days', async function (assert) {
    await render(<template><Full @state={{ctx.state}} /></template>);
    await fillIn('select[name="repeat.frequency"]', 'Weekly');

    assert.deepEqual(
      [
        ...document.querySelectorAll('#ember-testing input[type="checkbox"]'),
      ].map((el) => el.parentElement.textContent.trim()),
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    );

    await click('input[name="repeat.weekly.days.mon"]');
    await click('input[name="repeat.weekly.days.wed"]');
    await fillIn('input[name="repeat.weekly.interval"]', '2');

    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE`,
    );
    assert.dom('input[name="repeat.weekly.days.mon"]').isChecked();

    await click('input[name="repeat.weekly.days.mon"]');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE`,
    );
  });

  test('weekStartsOnSunday reorders days', async function (assert) {
    state.config = { ...state.config, weekStartsOnSunday: true };
    state.value = `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO`;
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.deepEqual(
      [
        ...document.querySelectorAll('#ember-testing input[type="checkbox"]'),
      ].map((el) => el.parentElement.textContent.trim()),
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    );
  });

  test('monthly on day', async function (assert) {
    await render(<template><Full @state={{ctx.state}} /></template>);
    await fillIn('select[name="repeat.frequency"]', 'Monthly');

    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1`,
    );
    assert.deepEqual(optionValues('select[name="repeat.monthly.mode"]'), [
      'on',
      'on the',
    ]);
    const days = optionValues('select[name="repeat.monthly.on.day"]');
    assert.strictEqual(days.length, 34, '31 days + 3 negative days');
    assert.deepEqual(days.slice(-3), ['-1', '-2', '-3']);

    await fillIn('select[name="repeat.monthly.on.day"]', '15');
    await fillIn('input[name="repeat.monthly.interval"]', '3');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=15`,
    );
  });

  test('monthly on the', async function (assert) {
    state.value = `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1`;
    await render(<template><Full @state={{ctx.state}} /></template>);

    await fillIn('select[name="repeat.monthly.mode"]', 'on the');
    assert.dom('select[name="repeat.monthly.on.day"]').doesNotExist();
    assert.deepEqual(
      optionValues('select[name="repeat.monthly.onThe.which"]'),
      ['First', 'Second', 'Third', 'Fourth', 'Last'],
    );

    await fillIn('select[name="repeat.monthly.onThe.which"]', 'Last');
    await fillIn('select[name="repeat.monthly.onThe.day"]', 'Weekday');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-1`,
    );
  });

  test('yearly on', async function (assert) {
    state.value = `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=1;BYMONTHDAY=1`;
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.deepEqual(
      optionLabels('select[name="repeat.yearly.on.month"]').slice(0, 3),
      ['January', 'February', 'March'],
    );

    await fillIn('select[name="repeat.yearly.on.month"]', 'Mar');
    await fillIn('select[name="repeat.yearly.on.day"]', '10');
    await fillIn('input[name="repeat.yearly.interval"]', '2');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=YEARLY;INTERVAL=2;BYMONTH=3;BYMONTHDAY=10`,
    );
  });

  test('yearly on the', async function (assert) {
    state.value = `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=1;BYMONTHDAY=1`;
    await render(<template><Full @state={{ctx.state}} /></template>);

    await fillIn('select[name="repeat.yearly.mode"]', 'on the');
    await fillIn('select[name="repeat.yearly.onThe.which"]', 'Fourth');
    await fillIn('select[name="repeat.yearly.onThe.day"]', 'Thursday');
    await fillIn('select[name="repeat.yearly.onThe.month"]', 'Nov');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=+4TH;BYMONTH=11`,
    );
  });

  test('end after / on date / never', async function (assert) {
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.deepEqual(optionValues('select[name="end.mode"]'), [
      'Never',
      'After',
      'On date',
    ]);

    await fillIn('select[name="end.mode"]', 'After');
    await fillIn('input[name="end.after"]', '5');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=1;COUNT=5`,
    );

    await fillIn('select[name="end.mode"]', 'On date');
    assert.dom('[data-test-date="end.onDate.date"]').hasText('empty');
    await click('[data-test-set-date="end.onDate.date"]');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=1;UNTIL=20221231T000000Z`,
    );

    await fillIn('select[name="end.mode"]', 'Never');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=1`,
    );
  });

  test('start date', async function (assert) {
    await render(<template><Full @state={{ctx.state}} /></template>);

    await click('[data-test-set-date="start.onDate.date"]');
    assert.strictEqual(
      state.lastChange(),
      'DTSTART:20221231T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1',
    );
  });

  test('timezone', async function (assert) {
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.deepEqual(optionValues('select[name="timezone.tzid"]'), [
      '',
      'UTC',
      'America/Monterrey',
    ]);
    assert.deepEqual(optionLabels('select[name="timezone.tzid"]')[0], 'Local');

    await fillIn('select[name="timezone.tzid"]', 'America/Monterrey');
    assert.strictEqual(
      state.lastChange(),
      'DTSTART;TZID=America/Monterrey:20220101T000000\nRRULE:FREQ=DAILY;INTERVAL=1',
    );
  });

  test('config limits frequency and end options', async function (assert) {
    state.config = {
      ...state.config,
      frequency: ['Weekly', 'Daily'],
      end: ['Never', 'After'],
    };
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.deepEqual(optionValues('select[name="repeat.frequency"]'), [
      'Weekly',
      'Daily',
    ]);
    assert.deepEqual(optionValues('select[name="end.mode"]'), [
      'Never',
      'After',
    ]);
  });

  test('config allowBYSETPOS=false hides weekday / weekend day', async function (assert) {
    state.config = { ...state.config, allowBYSETPOS: false };
    state.value = `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1`;
    await render(<template><Full @state={{ctx.state}} /></template>);
    await fillIn('select[name="repeat.monthly.mode"]', 'on the');

    assert.deepEqual(optionValues('select[name="repeat.monthly.onThe.day"]'), [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
  });

  test('custom translations function', async function (assert) {
    state.translations = (key) => `t:${key}`;
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.deepEqual(optionLabels('select[name="repeat.frequency"]'), [
      't:repeat.yearly.label',
      't:repeat.monthly.label',
      't:repeat.weekly.label',
      't:repeat.daily.label',
      't:repeat.hourly.label',
      't:repeat.minutely.label',
    ]);
  });

  test('@isDisabled is passed to every view', async function (assert) {
    state.isDisabled = true;
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.dom('select[name="repeat.frequency"]').isDisabled();
    assert.dom('select[name="end.mode"]').isDisabled();
    assert.dom('select[name="timezone.tzid"]').isDisabled();
    assert.dom('input[name="repeat.daily.interval"]').isDisabled();
  });

  test('an invalid @value still renders', async function (assert) {
    state.value = 'garbage';
    await render(<template><Full @state={{ctx.state}} /></template>);

    assert.dom('select[name="repeat.frequency"]').hasValue('Yearly');
  });

  test('container components accept a @view instead of a block', async function (assert) {
    await render(
      <template>
        <RRuleGenerator
          @value={{ctx.state.value}}
          @onChange={{ctx.state.onChange}}
          @config={{ctx.state.config}}
          as |Generator|
        >
          <Generator.Repeat @view={{RepeatView}} />
        </RRuleGenerator>
      </template>,
    );

    assert
      .dom('[data-test-repeat-view] select[name="repeat.frequency"]')
      .hasValue('Daily');
    await fillIn('input[name="repeat.daily.interval"]', '4');
    assert.strictEqual(
      state.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=4`,
    );
  });

  test('leaf components yield their props when used with a block', async function (assert) {
    await render(
      <template>
        <RRuleGenerator
          @value={{ctx.state.value}}
          @onChange={{ctx.state.onChange}}
          @config={{ctx.state.config}}
          as |Generator|
        >
          <Generator.Repeat as |Repeat|>
            <Repeat.Select as |s|>
              <span data-test-name>{{s.name}}</span>
              <span data-test-value>{{s.value}}</span>
              <span data-test-count>{{s.options.length}}</span>
            </Repeat.Select>
          </Generator.Repeat>
        </RRuleGenerator>
      </template>,
    );

    assert.dom('[data-test-name]').hasText('repeat.frequency');
    assert.dom('[data-test-value]').hasText('Daily');
    assert.dom('[data-test-count]').hasText('6');
  });

  test('Start.OnDate yields its props', async function (assert) {
    await render(
      <template>
        <RRuleGenerator
          @value={{ctx.state.value}}
          @onChange={{ctx.state.onChange}}
          @config={{ctx.state.config}}
          as |Generator|
        >
          <Generator.Start as |Start|>
            <Start.OnDate as |d|>
              <span data-test-start-name>{{d.name}}</span>
              <span data-test-start-set>{{if d.value "yes" "no"}}</span>
            </Start.OnDate>
          </Generator.Start>
        </RRuleGenerator>
      </template>,
    );

    assert.dom('[data-test-start-name]').hasText('start.onDate');
    assert.dom('[data-test-start-set]').hasText('yes');
  });

  test('Timezone.Select yields its props', async function (assert) {
    state.value = `DTSTART;TZID=UTC:20220101T000000\nRRULE:FREQ=DAILY;INTERVAL=1`;
    await render(
      <template>
        <RRuleGenerator
          @value={{ctx.state.value}}
          @onChange={{ctx.state.onChange}}
          @config={{ctx.state.config}}
          as |Generator|
        >
          <Generator.Timezone as |Timezone|>
            <Timezone.Select as |t|>
              <span data-test-tz-name>{{t.name}}</span>
              <span data-test-tz-value>{{t.value}}</span>
              <span data-test-tz-count>{{t.options.length}}</span>
            </Timezone.Select>
          </Generator.Timezone>
        </RRuleGenerator>
      </template>,
    );

    assert.dom('[data-test-tz-name]').hasText('timezone.tzid');
    assert.dom('[data-test-tz-value]').hasText('UTC');
    assert.dom('[data-test-tz-count]').hasText('3');
  });
});
