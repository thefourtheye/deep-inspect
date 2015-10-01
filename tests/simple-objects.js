var test = require('tape');
var util = require('./util');

test('Simple objects test', function (t) {

  util.patchLogger();

  t.plan(util.hasSymbolsSupport ? 11 : 9);

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

  if (util.hasSymbolsSupport) {
    var obj = {};
    obj[Symbol('a')] = 'a';

    t.equal(util.getTestResult(obj), '{}');

    t.equal(util.getTestResult(obj, {
      showHidden: true
    }), 'Object\n└─┬ Key: Symbol(a)\n  └── "a"');
  }

  t.throws(function () {
    util.getTestResult(String);
  },
  /^TypeError: Unexpected type: \[object Function\]$/);

  util.restoreLogger();
});
