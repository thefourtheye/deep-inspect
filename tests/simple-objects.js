var test = require('tape');
var util = require('./util');

test('Simple objects test', function (t) {

  util.patchLogger();

  t.plan(8);

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

  util.restoreLogger();
});
