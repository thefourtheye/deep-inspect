var test = require('tape');
var util = require('./util');

test('Simple Arrow Functions test', function (t) {
  util.patchLogger();

  t.plan(1);

  t.equal(util.getTestResult(() => 1), '[Function "Anonymous"]');

  util.restoreLogger();
});
