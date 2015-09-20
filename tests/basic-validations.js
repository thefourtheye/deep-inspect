var test = require('tape');
var util = require('./util');

test('primitives are printed as they are', function (t) {
  util.patchLogger();

  t.plan(9);
  t.equal(util.getTestResult(1), 1);
  t.equal(util.getTestResult('String data'), 'String data');
  t.equal(util.getTestResult(3.141519), 3.141519);
  t.equal(util.getTestResult(true), true);
  t.equal(util.getTestResult(false), false);
  t.notEqual(util.getTestResult(NaN), NaN);
  t.equal(util.getTestResult(null), null);
  t.equal(util.getTestResult(), undefined);
  t.equal(util.getTestResult(Infinity), Infinity);

  util.restoreLogger();
});
