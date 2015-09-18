var test = require('tape');
var inspect = require('../index.js');
var originalLogger = console.log;
var result = '';

console.log = function (data) {
  result = data;
};

function getTestResult(data) {
  inspect(data);
  return result;
}

test('primitives are printed as they are', function (t) {
  t.plan(9);
  t.equal(getTestResult(1), 1);
  t.equal(getTestResult('String data'), 'String data');
  t.equal(getTestResult(3.141519), 3.141519);
  t.equal(getTestResult(true), true);
  t.equal(getTestResult(false), false);
  t.notEqual(getTestResult(NaN), NaN);
  t.equal(getTestResult(null), null);
  t.equal(getTestResult(), undefined);
  t.equal(getTestResult(Infinity), Infinity);

  console.log = originalLogger;
});
