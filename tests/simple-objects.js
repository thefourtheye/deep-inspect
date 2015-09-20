var test = require('tape');
var inspect = require('../index.js');
var util = require('../util.js');
var originalLogger = console.log;
var result = '';

function patchLogger() {
  console.log = function (data) {
    result = data;
  };
}

function restoreLogger() {
  console.log = originalLogger;
}

function getTestResult(data) {
  inspect(data);
  // If it is not a primitive, strip the new line at the end
  return util.isPrimitive(data) ? result : result.slice(0, -1);
}

test('Simple objects test', function (t) {

  patchLogger();

  t.plan(2);
  t.equal(getTestResult({}), '{}');
  t.equal(getTestResult({
    1: '2'
  }), '[object Object]\n└─┬ Key: 1\n  └── 2');

  restoreLogger();
});
