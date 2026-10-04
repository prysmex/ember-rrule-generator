import { module, test } from 'qunit';

import numericalFieldHandler from 'ember-rrule-generator/utils/numerical-field-handler';
import translateLabel from 'ember-rrule-generator/utils/translateLabel';
import { DAYS, MONTHS } from 'ember-rrule-generator/utils/constants';

module('Unit | Utility | helpers', function () {
  module('numericalFieldHandler', function () {
    test('parses numbers and forwards them', function (assert) {
      const calls = [];
      const handler = numericalFieldHandler((e) => calls.push(e));

      handler({ target: { value: '12', name: 'repeat.daily.interval' } });

      assert.deepEqual(calls, [
        { target: { value: 12, name: 'repeat.daily.interval' } },
      ]);
    });

    test('ignores non-numbers and values >= 1000', function (assert) {
      const calls = [];
      const handler = numericalFieldHandler((e) => calls.push(e));

      handler({ target: { value: 'abc', name: 'x' } });
      handler({ target: { value: '1000', name: 'x' } });
      handler({ target: { value: '', name: 'x' } });

      assert.deepEqual(calls, []);
    });
  });

  module('translateLabel', function () {
    test('looks up nested keys in an object', function (assert) {
      assert.strictEqual(
        translateLabel({ end: { label: 'End' } }, 'end.label'),
        'End'
      );
    });

    test('replaces placeholders', function (assert) {
      assert.strictEqual(
        translateLabel({ msg: 'Hello %{name}' }, 'msg', { name: 'World' }),
        'Hello World'
      );
    });

    test('flags missing keys', function (assert) {
      assert.strictEqual(
        translateLabel({}, 'nope'),
        "[translation missing 'nope']"
      );
    });

    test('delegates to a function', function (assert) {
      assert.strictEqual(
        translateLabel((key, r) => `${key}:${r.a}`, 'k', { a: 1 }),
        'k:1'
      );
    });

    test('returns null for unsupported translations', function (assert) {
      assert.strictEqual(translateLabel('nope', 'k'), null);
    });
  });

  test('constants', function (assert) {
    assert.strictEqual(MONTHS.length, 12);
    assert.strictEqual(MONTHS[0], 'Jan');
    assert.deepEqual(DAYS.slice(-2), ['Weekday', 'Weekend day']);
  });
});
