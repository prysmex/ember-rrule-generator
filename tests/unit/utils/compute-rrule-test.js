import { module, test } from 'qunit';

import computeRRuleToString from '#src/utils/computeRRule/toString/computeRRule.js';
import computeRRuleFromString from '#src/utils/computeRRule/fromString/computeRRule.js';
import configureInitialState from '#src/utils/configureInitialState.ts';

const START = 'DTSTART:20220101T000000Z';

function initialData(config) {
  return configureInitialState(config, 'test-id').data;
}

function parse(rrule, config) {
  return computeRRuleFromString(initialData(config), rrule);
}

module('Unit | Utility | computeRRule', function () {
  module('configureInitialState', function () {
    test('uses sensible defaults', function (assert) {
      const state = configureInitialState(undefined, 'my-id');

      assert.strictEqual(state.id, 'my-id');
      assert.strictEqual(state.data.repeat.frequency, 'Yearly');
      assert.strictEqual(state.data.repeat.yearly.mode, 'on');
      assert.strictEqual(state.data.repeat.monthly.mode, 'on');
      assert.strictEqual(state.data.end.mode, 'Never');
      assert.strictEqual(state.data.error, null);
      assert.ok(
        state.rrule.includes(
          'RRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=1;BYMONTHDAY=1',
        ),
        `initial rrule: ${state.rrule}`,
      );
    });

    test('generates a unique id when none is given', function (assert) {
      const a = configureInitialState({}).id;
      const b = configureInitialState({}).id;

      assert.ok(a.startsWith('rrule-'));
      assert.notStrictEqual(a, b);
    });

    test('honours config', function (assert) {
      const supportedTimezones = () => ['UTC'];
      const { data } = configureInitialState(
        {
          frequency: ['Weekly', 'Daily'],
          yearly: 'on the',
          monthly: 'on the',
          end: ['After', 'Never'],
          hideStart: true,
          weekStartsOnSunday: true,
          supportedTimezones,
        },
        'x',
      );

      assert.strictEqual(data.repeat.frequency, 'Weekly');
      assert.strictEqual(data.repeat.yearly.mode, 'on the');
      assert.strictEqual(data.repeat.monthly.mode, 'on the');
      assert.strictEqual(data.end.mode, 'After');
      assert.true(data.options.hideStart);
      assert.true(data.repeat.weekly.options.weekStartsOnSunday);
      assert.strictEqual(
        data.timezone.options.supportedTimezones,
        supportedTimezones,
      );
    });
  });

  module('toString', function () {
    test('serializes the default state', function (assert) {
      const data = initialData();
      data.start.onDate.date = new Date('2022-01-01T00:00:00Z');

      assert.strictEqual(
        computeRRuleToString(data),
        `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=1;BYMONTHDAY=1`,
      );
    });

    test('omits DTSTART when hideStart is set', function (assert) {
      const data = initialData({ hideStart: true });
      data.repeat.frequency = 'Daily';

      assert.strictEqual(
        computeRRuleToString(data),
        'RRULE:FREQ=DAILY;INTERVAL=1',
      );
    });

    test('adds WKST when weekStartsOnSunday is set', function (assert) {
      const data = initialData({ hideStart: true, weekStartsOnSunday: true });
      data.repeat.frequency = 'Weekly';
      data.repeat.weekly.days.sun = true;

      assert.strictEqual(
        computeRRuleToString(data),
        'RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=SU;WKST=SU',
      );
    });
  });

  module('fromString', function () {
    test('returns the data untouched for an empty value', function (assert) {
      const data = initialData();

      assert.strictEqual(computeRRuleFromString(data, ''), data);
      assert.strictEqual(computeRRuleFromString(data, undefined), data);
    });

    test('sets an error for an invalid rrule', function (assert) {
      const data = parse('garbage');

      assert.strictEqual(data.error.value, 'garbage');
      assert.ok(String(data.error.message).includes('garbage'));
    });

    test('parses daily', function (assert) {
      const data = parse(`${START}\nRRULE:FREQ=DAILY;INTERVAL=2`);

      assert.strictEqual(data.error, null);
      assert.strictEqual(data.repeat.frequency, 'Daily');
      assert.strictEqual(data.repeat.daily.interval, 2);
      assert.strictEqual(
        data.start.onDate.date.toISOString(),
        '2022-01-01T00:00:00.000Z',
      );
    });

    test('parses hourly and minutely', function (assert) {
      const hourly = parse(`${START}\nRRULE:FREQ=HOURLY;INTERVAL=6`);
      assert.strictEqual(hourly.repeat.frequency, 'Hourly');
      assert.strictEqual(hourly.repeat.hourly.interval, 6);

      const minutely = parse(`${START}\nRRULE:FREQ=MINUTELY;INTERVAL=15`);
      assert.strictEqual(minutely.repeat.frequency, 'Minutely');
      assert.strictEqual(minutely.repeat.minutely.interval, 15);
    });

    test('parses weekly days', function (assert) {
      const data = parse(
        `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=3;BYDAY=MO,WE,FR`,
      );

      assert.strictEqual(data.repeat.frequency, 'Weekly');
      assert.strictEqual(data.repeat.weekly.interval, 3);
      assert.deepEqual(data.repeat.weekly.days, {
        mon: true,
        tue: false,
        wed: true,
        thu: false,
        fri: true,
        sat: false,
        sun: false,
      });
    });

    test('parses monthly on day', function (assert) {
      const data = parse(
        `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=-1`,
      );

      assert.strictEqual(data.repeat.frequency, 'Monthly');
      assert.strictEqual(data.repeat.monthly.mode, 'on');
      assert.strictEqual(data.repeat.monthly.on.day, -1);
    });

    test('parses monthly on the (BYSETPOS)', function (assert) {
      const data = parse(
        `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=2;BYSETPOS=-1;BYDAY=MO,TU,WE,TH,FR`,
      );

      assert.strictEqual(data.repeat.monthly.mode, 'on the');
      assert.strictEqual(data.repeat.monthly.interval, 2);
      assert.deepEqual(data.repeat.monthly.onThe, {
        day: 'Weekday',
        which: 'Last',
      });
    });

    test('parses monthly on the (nth BYDAY)', function (assert) {
      const data = parse(`${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=+2TU`);

      assert.deepEqual(data.repeat.monthly.onThe, {
        day: 'Tuesday',
        which: 'Second',
      });
    });

    test('parses yearly on', function (assert) {
      const data = parse(
        `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=3;BYMONTHDAY=10`,
      );

      assert.strictEqual(data.repeat.frequency, 'Yearly');
      assert.strictEqual(data.repeat.yearly.mode, 'on');
      assert.deepEqual(data.repeat.yearly.on, { month: 'Mar', day: 10 });
    });

    test('parses yearly on the', function (assert) {
      const data = parse(
        `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=11;BYDAY=+4TH`,
      );

      assert.strictEqual(data.repeat.yearly.mode, 'on the');
      assert.deepEqual(data.repeat.yearly.onThe, {
        month: 'Nov',
        day: 'Thursday',
        which: 'Fourth',
      });
    });

    test('parses end after (COUNT)', function (assert) {
      const data = parse(`${START}\nRRULE:FREQ=DAILY;INTERVAL=1;COUNT=5`);

      assert.strictEqual(data.end.mode, 'After');
      assert.strictEqual(data.end.after, 5);
    });

    test('parses end on date (UNTIL)', function (assert) {
      const data = parse(
        `${START}\nRRULE:FREQ=DAILY;INTERVAL=1;UNTIL=20221231T000000Z`,
      );

      assert.strictEqual(data.end.mode, 'On date');
      assert.strictEqual(
        data.end.onDate.date.toISOString(),
        '2022-12-31T00:00:00.000Z',
      );
    });

    test('parses TZID', function (assert) {
      const data = parse(
        'DTSTART;TZID=America/Monterrey:20220101T090000\nRRULE:FREQ=DAILY;INTERVAL=1',
      );

      assert.strictEqual(data.timezone.tzid, 'America/Monterrey');
    });

    test('parses WKST=SU', function (assert) {
      const data = parse(
        `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=1;WKST=SU;BYDAY=SU`,
      );

      assert.true(data.options.weekStartsOnSunday);
    });
  });

  module('round trip (fromString → toString)', function () {
    const cases = [
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=2`,
      `${START}\nRRULE:FREQ=HOURLY;INTERVAL=6`,
      `${START}\nRRULE:FREQ=MINUTELY;INTERVAL=15`,
      `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR`,
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=15`,
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=-1`,
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-1`,
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=SA,SU;BYSETPOS=1`,
      `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYMONTH=3;BYMONTHDAY=10`,
      `${START}\nRRULE:FREQ=YEARLY;INTERVAL=2;BYDAY=+4TH;BYMONTH=11`,
      `${START}\nRRULE:FREQ=YEARLY;INTERVAL=3;BYMONTH=3;BYMONTHDAY=10`,
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=+2TU`,
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=2;BYDAY=-1FR`,
      `${START}\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=+3TH`,
      `${START}\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=SU;WKST=SU`,
      `${START}\nRRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=-1MO;BYMONTH=5`,
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=1;COUNT=5`,
      `${START}\nRRULE:FREQ=DAILY;INTERVAL=1;UNTIL=20221231T000000Z`,
      'DTSTART;TZID=America/Monterrey:20220101T090000\nRRULE:FREQ=DAILY;INTERVAL=1',
    ];

    for (const rrule of cases) {
      test(rrule.replace('\n', ' '), function (assert) {
        assert.strictEqual(computeRRuleToString(parse(rrule)), rrule);
      });
    }

    test('yearly interval', function (assert) {
      const rrule = `${START}\nRRULE:FREQ=YEARLY;INTERVAL=2;BYMONTH=3;BYMONTHDAY=10`;

      assert.strictEqual(computeRRuleToString(parse(rrule)), rrule);
    });

    test('monthly on the Thursday', function (assert) {
      const data = initialData({ hideStart: true });
      data.repeat.frequency = 'Monthly';
      data.repeat.monthly.mode = 'on the';
      data.repeat.monthly.onThe = { day: 'Thursday', which: 'Third' };

      assert.strictEqual(
        computeRRuleToString(data),
        'RRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=+3TH',
      );
    });
  });
});
