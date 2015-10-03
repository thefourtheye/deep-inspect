var test = require('tape');
var util = require('./util');

test('primitives are printed as they are', function (t) {
  util.patchLogger();

  t.plan(9);
  t.equal(util.getTestResult(1), '1');
  t.equal(util.getTestResult('String data'), '"String data"');
  t.equal(util.getTestResult(3.141519), '3.141519');
  t.equal(util.getTestResult(true), 'true');
  t.equal(util.getTestResult(false), 'false');
  t.equal(util.getTestResult(NaN), 'NaN');
  t.equal(util.getTestResult(null), 'null');
  t.equal(util.getTestResult(), 'undefined');
  t.equal(util.getTestResult(Infinity), 'Infinity');

  util.restoreLogger();
});

test('invalid data should throw', function (t) {
  t.plan(4);

  t.throws(function () {
    util.getTestResult(1, 1);
  }, /Object to be cloned must be an Object/);

  t.throws(function () {
    util.getTestResult(1, {
      showHidden: 1
    });
  }, /showHidden property must be a boolean/);

  t.throws(function () {
    util.getTestResult(1, {
      depth: -1
    });
  }, /depth property must be a positive, non-zero integer/);

  t.throws(function () {
    util.getTestResult(1, {
      parentChainLevel: -1
    });
  }, /parentChainLevel property must be a positive, non-zero integer/);

});
