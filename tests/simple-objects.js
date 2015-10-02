var test = require('tape');
var util = require('./util');

test('Simple objects test', function (t) {
  util.patchLogger();

  t.plan(10);

  t.equal(util.getTestResult({}), '{}');

  t.equal(util.getTestResult([]), '[]');

  t.equal(util.getTestResult({
    1: '2'
  }), 'Object\n└─┬ Key: "1"\n  └── "2"');

  t.equal(util.getTestResult({
    1: 2
  }), 'Object\n└─┬ Key: "1"\n  └── 2');

  t.equal(util.getTestResult(Object.create(null), {
    showHidden: true
  }), '{}');

  t.equal(util.getTestResult(util.patchLogger, {
    showHidden: true
  }),
  'Function\n' +
  '├─┬ Key: "length"\n' +
  '│ └── 0\n' +
  '├─┬ Key: "name"\n' +
  '│ └── "patchLogger"\n' +
  '├─┬ Key: "arguments"\n' +
  '│ └── null\n' +
  '├─┬ Key: "caller"\n' +
  '│ └── null\n' +
  '└─┬ Key: "prototype"\n' +
  '  └── [object Object]');

  t.equal(util.getTestResult(Object.create(null), {
    showHidden: true,
    showInherited: true
  }), '{}');

  t.equal(util.getTestResult({
    '': ''
  }), 'Object\n└─┬ Key: ""\n  └── ""');

  t.equal(util.getTestResult(String), '[Function "String"]');

  t.equal(util.getTestResult([1, 'a', true, undefined, null, 3.14, NaN,
    Infinity
  ]),
  'Array\n' +
  '├─┬ Index: "0"\n' +
  '│ └── 1\n' +
  '├─┬ Index: "1"\n' +
  '│ └── "a"\n' +
  '├─┬ Index: "2"\n' +
  '│ └── true\n' +
  '├─┬ Index: "3"\n' +
  '│ └── undefined\n' +
  '├─┬ Index: "4"\n' +
  '│ └── null\n' +
  '├─┬ Index: "5"\n' +
  '│ └── 3.14\n' +
  '├─┬ Index: "6"\n' +
  '│ └── NaN\n' +
  '└─┬ Index: "7"\n' +
  '  └── Infinity');

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
    }), 'Object\n└─┬ Key: Symbol(a)\n  └── "a"');

    util.restoreLogger();
  });

}
