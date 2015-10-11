var test = require('tape');
var util = require('./util');

test.createStream()
  .pipe(require('tap-spec')())
  .pipe(process.stderr);

test('Simple objects test', function (t) {
  util.patchLogger();

  t.plan(13);

  t.equal(util.getTestResult({}), '{}');

  t.equal(util.getTestResult([]), '[]');

  t.equal(util.getTestResult({
    1: '2'
  }), [
    'Object',
    '└─┬ Key: "1"',
    '  └── "2"'
  ].join('\n'));

  t.equal(util.getTestResult({
    1: 2
  }), [
    'Object',
    '└─┬ Key: "1"',
    '  └── 2'
  ].join('\n'));

  t.equal(util.getTestResult(Object.create(null), {
    showHidden: true
  }), '{}');

  t.equal(util.getTestResult(util.patchLogger, {showHidden: true}), [
    '[Function patchLogger]',
    '├─┬ Key: "length"',
    '│ └── 0',
    '├─┬ Key: "name"',
    '│ └── "patchLogger"',
    '├─┬ Key: "arguments"',
    '│ └── null',
    '├─┬ Key: "caller"',
    '│ └── null',
    '└─┬ Key: "prototype"',
    '  └── Object'
  ].join('\n'));

  t.equal(util.getTestResult(Object.create(null), {
    showHidden: true,
    parentChainLevel: 1
  }), [
    'Object',
    '└── [[Parent]] : null'
  ].join('\n'));

  t.equal(util.getTestResult({'': ''}), [
    'Object',
    '└─┬ Key: ""',
    '  └── ""'
  ].join('\n'));

  t.equal(util.getTestResult(String), '[Function "String"]');

  t.equal(util.getTestResult([1, 'a', true, undefined, null, 3.14, NaN,
      Infinity
    ]), [
      'Array',
      '├─┬ Index: "0"',
      '│ └── 1',
      '├─┬ Index: "1"',
      '│ └── "a"',
      '├─┬ Index: "2"',
      '│ └── true',
      '├─┬ Index: "3"',
      '│ └── undefined',
      '├─┬ Index: "4"',
      '│ └── null',
      '├─┬ Index: "5"',
      '│ └── 3.14',
      '├─┬ Index: "6"',
      '│ └── NaN',
      '└─┬ Index: "7"',
      '  └── Infinity'
    ].join('\n'));

  // test with hidden properties of array should show both index and key
  t.equal(util.getTestResult([1, 2], {showHidden: true}), [
    'Array',
    '├─┬ Index: "0"',
    '│ └── 1',
    '├─┬ Index: "1"',
    '│ └── 2',
    '└─┬ Key: "length"',
    '  └── 2'
  ].join('\n'));

  t.equal(util.getTestResult(/abcd/), '[object RegExp]');

  t.equal(util.getTestResult(new Date()), '[object Date]');

  util.restoreLogger();
});

if (util.hasSymbolsSupport) {

  test('Simple Symbols test', function (t) {
    util.patchLogger();

    t.plan(2);

    var obj = {};
    obj[Symbol('a')] = 'a';

    t.equal(util.getTestResult(obj), '{}');

    t.equal(util.getTestResult(obj, {
      showHidden: true
    }), [
      'Object',
      '└─┬ Key: Symbol(a)',
      '  └── "a"'
    ].join('\n'));

    util.restoreLogger();
  });

}

if (util.hasArrowFunctions) {
  require('./arrow-functions');
}
