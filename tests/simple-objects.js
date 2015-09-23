var test = require('tape');
var util = require('./util');

test('Simple objects test', function (t) {

  util.patchLogger();

  t.plan(3);
  t.equal(util.getTestResult({}), '{}');
  t.equal(util.getTestResult({
    1: '2'
  }), '[object Object]\n└─┬ Key: \'1\'\n  └── \'2\'');
  t.equal(util.getTestResult({
    1: 2
  }), '[object Object]\n└─┬ Key: \'1\'\n  └── 2');

  util.restoreLogger();
});
