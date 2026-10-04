import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';
import Component from '@glimmer/component';

import RRuleGenerator from 'ember-rrule-generator/components/r-rule-generator';

const START = 'DTSTART:20220101T000000Z';

/*
 * Minimal "view" components, the way a consumer of this headless addon
 * would write them.
 */
class TestSelect extends Component {
  isSelected = (a, b) => String(a) === String(b);
}
setComponentTemplate(
  hbs`<select
    name={{@name}}
    disabled={{@isDisabled}}
    {{on "change" @handleChange}}
  >
    {{#each @options as |opt|}}
      <option
        value={{opt.value}}
        selected={{this.isSelected opt.value @value}}
      >{{opt.label}}</option>
    {{/each}}
  </select>`,
  TestSelect
);

const TestNumber = setComponentTemplate(
  hbs`<input
    type="number"
    name={{@name}}
    value={{@value}}
    disabled={{@isDisabled}}
    {{on "input" @handleChange}}
  />`,
  templateOnly()
);

const TestDays = setComponentTemplate(
  hbs`{{#each @days as |pair|}}
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
  {{/each}}`,
  templateOnly()
);

class TestDate extends Component {
  setDate = (iso) => {
    this.args.handleChange({
      target: { value: iso ? new Date(iso) : null, name: this.args.name },
    });
  };
}
setComponentTemplate(
  hbs`<output data-test-date={{@name}}>{{if @value "set" "empty"}}</output>
  <button
    type="button"
    data-test-set-date={{@name}}
    {{on "click" (fn this.setDate "2022-12-31T00:00:00Z")}}
  >set</button>
  <button
    type="button"
    data-test-clear-date={{@name}}
    {{on "click" (fn this.setDate null)}}
  >clear</button>`,
  TestDate
);

const FULL_TEMPLATE = hbs`
  <this.RRuleGenerator
    @value={{this.value}}
    @onChange={{this.onChange}}
    @config={{this.config}}
    @translations={{this.translations}}
    @isDisabled={{this.isDisabled}}
    as |Generator|
  >
    <Generator.Timezone as |Timezone|>
      <Timezone.Select @view={{this.Select}} />
    </Generator.Timezone>
    <Generator.Start as |Start|>
      <Start.OnDate @view={{this.DateInput}} />
    </Generator.Start>
    <Generator.Repeat as |Repeat|>
      <Repeat.Select @view={{this.Select}} />
      {{#if Repeat.isYearlyActive}}
        <Repeat.Yearly as |Yearly|>
          <Yearly.Interval @view={{this.NumberInput}} />
          <Yearly.Select @view={{this.Select}} />
          {{#if Yearly.isOnActive}}
            <Yearly.On as |On|>
              <On.Month @view={{this.Select}} />
              <On.Day @view={{this.Select}} />
            </Yearly.On>
          {{/if}}
          {{#if Yearly.isOnTheActive}}
            <Yearly.OnThe as |OnThe|>
              <OnThe.Which @view={{this.Select}} />
              <OnThe.Day @view={{this.Select}} />
              <OnThe.Month @view={{this.Select}} />
            </Yearly.OnThe>
          {{/if}}
        </Repeat.Yearly>
      {{/if}}
      {{#if Repeat.isMonthlyActive}}
        <Repeat.Monthly as |Monthly|>
          <Monthly.Interval @view={{this.NumberInput}} />
          <Monthly.Select @view={{this.Select}} />
          {{#if Monthly.isOnActive}}
            <Monthly.On as |On|>
              <On.Day @view={{this.Select}} />
            </Monthly.On>
          {{/if}}
          {{#if Monthly.isOnTheActive}}
            <Monthly.OnThe as |OnThe|>
              <OnThe.Which @view={{this.Select}} />
              <OnThe.Day @view={{this.Select}} />
            </Monthly.OnThe>
          {{/if}}
        </Repeat.Monthly>
      {{/if}}
      {{#if Repeat.isWeeklyActive}}
        <Repeat.Weekly as |Weekly|>
          <Weekly.Interval @view={{this.NumberInput}} />
          <Weekly.Days @view={{this.Days}} />
        </Repeat.Weekly>
      {{/if}}
      {{#if Repeat.isDailyActive}}
        <Repeat.Daily as |Daily|>
          <Daily.Interval @view={{this.NumberInput}} />
        </Repeat.Daily>
      {{/if}}
      {{#if Repeat.isHourlyActive}}
        <Repeat.Hourly as |Hourly|>
          <Hourly.Interval @view={{this.NumberInput}} />
        </Repeat.Hourly>
      {{/if}}
      {{#if Repeat.isMinutelyActive}}
        <Repeat.Minutely as |Minutely|>
          <Minutely.Interval @view={{this.NumberInput}} />
        </Repeat.Minutely>
      {{/if}}
    </Generator.Repeat>
    <Generator.End as |End|>
      <End.Select @view={{this.Select}} />
      {{#if End.isOnDateActive}}
        <End.OnDate @view={{this.DateInput}} />
      {{else if End.isAfterActive}}
        <End.After @view={{this.NumberInput}} />
      {{/if}}
    </Generator.End>
  </this.RRuleGenerator>
`;

function optionValues(selector) {
  return [...document.querySelectorAll(`${selector} option`)].map(
    (o) => o.value
  );
}

function optionLabels(selector) {
  return [...document.querySelectorAll(`${selector} option`)].map((o) =>
    o.textContent.trim()
  );
}

module('Integration | Component | r-rule-generator', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.changes = [];
    this.RRuleGenerator = RRuleGenerator;
    this.Select = TestSelect;
    this.NumberInput = TestNumber;
    this.Days = TestDays;
    this.DateInput = TestDate;
    this.config = { supportedTimezones: () => ['UTC', 'America/Monterrey'] };
    this.value = `${START}\nRRULE:FREQ=DAILY;INTERVAL=1`;
    this.onChange = (rrule) => {
      this.changes.push(rrule);
      this.set('value', rrule);
    };
    this.lastChange = () => this.changes[this.changes.length - 1];
  });

  test('renders the state described by @value', async function (assert) {
    this.value = `${START}\nRRULE:FREQ=DAILY;INTERVAL=2;COUNT=3`;
    await render(FULL_TEMPLATE);

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
    assert.deepEqual(this.changes, [], 'does not emit on render');
  });

  test('re-renders when @value changes from the outside', async function (assert) {
    await render(FULL_TEMPLATE);
    assert.dom('select[name="repeat.frequency"]').hasValue('Daily');

    this.set('value', `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU`);
    await settled();

    assert.dom('select[name="repeat.frequency"]').hasValue('Weekly');
    assert.dom('input[name="repeat.weekly.days.tue"]').isChecked();
    assert.dom('input[name="repeat.weekly.days.mon"]').isNotChecked();
  });

  test('changing frequency emits a new rrule', async function (assert) {
    await render(FULL_TEMPLATE);

    await fillIn('select[name="repeat.frequency"]', 'Hourly');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=HOURLY;INTERVAL=1`
    );
    assert.dom('input[name="repeat.hourly.interval"]').exists();

    await fillIn('select[name="repeat.frequency"]', 'Minutely');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=MINUTELY;INTERVAL=1`
    );
  });

  test('daily interval', async function (assert) {
    await render(FULL_TEMPLATE);

    await fillIn('input[name="repeat.daily.interval"]', '5');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=5`
    );

    const count = this.changes.length;
    await fillIn('input[name="repeat.daily.interval"]', '1000');
    assert.strictEqual(this.changes.length, count, 'ignores values >= 1000');
  });

  test('weekly interval and days', async function (assert) {
    await render(FULL_TEMPLATE);
    await fillIn('select[name="repeat.frequency"]', 'Weekly');

    assert.deepEqual(
      [...document.querySelectorAll('#ember-testing input[type="checkbox"]')].map((el) =>
        el.parentElement.textContent.trim()
      ),
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    );

    await click('input[name="repeat.weekly.days.mon"]');
    await click('input[name="repeat.weekly.days.wed"]');
    await fillIn('input[name="repeat.weekly.interval"]', '2');

    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE`
    );
    assert.dom('input[name="repeat.weekly.days.mon"]').isChecked();

    await click('input[name="repeat.weekly.days.mon"]');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE`
    );
  });

  test('weekStartsOnSunday reorders days', async function (assert) {
    this.config = { ...this.config, weekStartsOnSunday: true };
    this.value = `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO`;
    await render(FULL_TEMPLATE);

    assert.deepEqual(
      [...document.querySelectorAll('#ember-testing input[type="checkbox"]')].map((el) =>
        el.parentElement.textContent.trim()
      ),
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    );
  });

  test('monthly on day', async function (assert) {
    await render(FULL_TEMPLATE);
    await fillIn('select[name="repeat.frequency"]', 'Monthly');

    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1`
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
      this.lastChange(),
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=15`
    );
  });

  test('monthly on the', async function (assert) {
    this.value = `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1`;
    await render(FULL_TEMPLATE);

    await fillIn('select[name="repeat.monthly.mode"]', 'on the');
    assert.dom('select[name="repeat.monthly.on.day"]').doesNotExist();
    assert.deepEqual(optionValues('select[name="repeat.monthly.onThe.which"]'), [
      'First',
      'Second',
      'Third',
      'Fourth',
      'Last',
    ]);

    await fillIn('select[name="repeat.monthly.onThe.which"]', 'Last');
    await fillIn('select[name="repeat.monthly.onThe.day"]', 'Weekday');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-1`
    );
  });

  test('yearly on', async function (assert) {
    this.value = `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=1;BYMONTHDAY=1`;
    await render(FULL_TEMPLATE);

    assert.deepEqual(optionLabels('select[name="repeat.yearly.on.month"]').slice(0, 3), [
      'January',
      'February',
      'March',
    ]);

    await fillIn('select[name="repeat.yearly.on.month"]', 'Mar');
    await fillIn('select[name="repeat.yearly.on.day"]', '10');
    await fillIn('input[name="repeat.yearly.interval"]', '2');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=YEARLY;INTERVAL=2;BYMONTH=3;BYMONTHDAY=10`
    );
  });

  test('yearly on the', async function (assert) {
    this.value = `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=1;BYMONTHDAY=1`;
    await render(FULL_TEMPLATE);

    await fillIn('select[name="repeat.yearly.mode"]', 'on the');
    await fillIn('select[name="repeat.yearly.onThe.which"]', 'Fourth');
    await fillIn('select[name="repeat.yearly.onThe.day"]', 'Thursday');
    await fillIn('select[name="repeat.yearly.onThe.month"]', 'Nov');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=+4TH;BYMONTH=11`
    );
  });

  test('end after / on date / never', async function (assert) {
    await render(FULL_TEMPLATE);

    assert.deepEqual(optionValues('select[name="end.mode"]'), [
      'Never',
      'After',
      'On date',
    ]);

    await fillIn('select[name="end.mode"]', 'After');
    await fillIn('input[name="end.after"]', '5');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=1;COUNT=5`
    );

    await fillIn('select[name="end.mode"]', 'On date');
    assert.dom('[data-test-date="end.onDate.date"]').hasText('empty');
    await click('[data-test-set-date="end.onDate.date"]');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=1;UNTIL=20221231T000000Z`
    );

    await fillIn('select[name="end.mode"]', 'Never');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=1`
    );
  });

  test('start date', async function (assert) {
    await render(FULL_TEMPLATE);

    await click('[data-test-set-date="start.onDate.date"]');
    assert.strictEqual(
      this.lastChange(),
      'DTSTART:20221231T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1'
    );
  });

  test('timezone', async function (assert) {
    await render(FULL_TEMPLATE);

    assert.deepEqual(optionValues('select[name="timezone.tzid"]'), [
      '',
      'UTC',
      'America/Monterrey',
    ]);
    assert.deepEqual(optionLabels('select[name="timezone.tzid"]')[0], 'Local');

    await fillIn('select[name="timezone.tzid"]', 'America/Monterrey');
    assert.strictEqual(
      this.lastChange(),
      'DTSTART;TZID=America/Monterrey:20220101T000000\nRRULE:FREQ=DAILY;INTERVAL=1'
    );
  });

  test('config limits frequency and end options', async function (assert) {
    this.config = {
      ...this.config,
      frequency: ['Weekly', 'Daily'],
      end: ['Never', 'After'],
    };
    await render(FULL_TEMPLATE);

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
    this.config = { ...this.config, allowBYSETPOS: false };
    this.value = `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1`;
    await render(FULL_TEMPLATE);
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
    this.translations = (key) => `t:${key}`;
    await render(FULL_TEMPLATE);

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
    this.isDisabled = true;
    await render(FULL_TEMPLATE);

    assert.dom('select[name="repeat.frequency"]').isDisabled();
    assert.dom('select[name="end.mode"]').isDisabled();
    assert.dom('select[name="timezone.tzid"]').isDisabled();
    assert.dom('input[name="repeat.daily.interval"]').isDisabled();
  });

  test('an invalid @value still renders', async function (assert) {
    this.value = 'garbage';
    await render(FULL_TEMPLATE);

    assert.dom('select[name="repeat.frequency"]').hasValue('Yearly');
  });

  test('container components accept a @view instead of a block', async function (assert) {
    this.RepeatView = setComponentTemplate(
      hbs`<div data-test-repeat-view>
        <@Repeat.Select @view={{this.Select}} />
        {{#if this.repeat.isDailyActive}}
          <@Repeat.Daily @view={{this.DailyView}} />
        {{/if}}
      </div>`,
      class extends Component {
        get repeat() {
          return this.args.Repeat;
        }
        Select = TestSelect;
        DailyView = setComponentTemplate(
          hbs`<@Daily.Interval @view={{this.NumberInput}} />`,
          class extends Component {
            NumberInput = TestNumber;
          }
        );
      }
    );

    await render(hbs`
      <this.RRuleGenerator
        @value={{this.value}}
        @onChange={{this.onChange}}
        @config={{this.config}}
        as |Generator|
      >
        <Generator.Repeat @view={{this.RepeatView}} />
      </this.RRuleGenerator>
    `);

    assert.dom('[data-test-repeat-view] select[name="repeat.frequency"]').hasValue('Daily');
    await fillIn('input[name="repeat.daily.interval"]', '4');
    assert.strictEqual(
      this.lastChange(),
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=4`
    );
  });

  test('leaf components yield their props when used with a block', async function (assert) {
    await render(hbs`
      <this.RRuleGenerator
        @value={{this.value}}
        @onChange={{this.onChange}}
        @config={{this.config}}
        as |Generator|
      >
        <Generator.Repeat as |Repeat|>
          <Repeat.Select as |s|>
            <span data-test-name>{{s.name}}</span>
            <span data-test-value>{{s.value}}</span>
            <span data-test-count>{{s.options.length}}</span>
          </Repeat.Select>
        </Generator.Repeat>
      </this.RRuleGenerator>
    `);

    assert.dom('[data-test-name]').hasText('repeat.frequency');
    assert.dom('[data-test-value]').hasText('Daily');
    assert.dom('[data-test-count]').hasText('6');
  });
});
