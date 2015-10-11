var test = require('tape');
var util = require('./util');

test.createStream()
  .pipe(require('tap-spec'))
  .pipe(process.stderr);

test('Simple nested objects test', function (t) {
  util.patchLogger();

  t.plan(7);

  t.equal(util.getTestResult([1, [2, 3]]), [
    'Array',
    '├─┬ Index: "0"',
    '│ └── 1',
    '└─┬ Index: "1"',
    '  └── Array'
  ].join('\n'));

  t.equal(util.getTestResult({1: {2: 3}}), [
    'Object',
    '└─┬ Key: "1"',
    '  └── Object'
  ].join('\n'));

  t.equal(util.getTestResult([1, [2, 3]], {depth: 2}), [
    'Array',
    '├─┬ Index: "0"',
    '│ └── 1',
    '└─┬ Index: "1"',
    '  └─┬ Array',
    '    ├─┬ Index: "0"',
    '    │ └── 2',
    '    └─┬ Index: "1"',
    '      └── 3'
  ].join('\n'));

  t.equal(util.getTestResult({1: {2: 3}}, {depth: 2}), [
    'Object',
    '└─┬ Key: "1"',
    '  └─┬ Object',
    '    └─┬ Key: "2"',
    '      └── 3'
  ].join('\n'));

  t.equal(util.getTestResult([1, {2: 3}], {depth: 2}), [
    'Array',
    '├─┬ Index: "0"',
    '│ └── 1',
    '└─┬ Index: "1"',
    '  └─┬ Object',
    '    └─┬ Key: "2"',
    '      └── 3'
  ].join('\n'));

  t.equal(util.getTestResult({1: [2, 3]}, {depth: 2}), [
    'Object',
    '└─┬ Key: "1"',
    '  └─┬ Array',
    '    ├─┬ Index: "0"',
    '    │ └── 2',
    '    └─┬ Index: "1"',
    '      └── 3'
  ].join('\n'));

  // test with depth more than the actual
  t.equal(util.getTestResult({1: [2, 3]}, {depth: 10}), [
    'Object',
    '└─┬ Key: "1"',
    '  └─┬ Array',
    '    ├─┬ Index: "0"',
    '    │ └── 2',
    '    └─┬ Index: "1"',
    '      └── 3'
  ].join('\n'));

  util.restoreLogger();
});
