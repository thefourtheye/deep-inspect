var test = require('tape');
var inspect = require('../index.js');


test('primitives are returned as they are', function (t) {
  t.plan(9);
  t.equal(inspect(1), 1);
  t.equal(inspect('String data'), 'String data');
  t.equal(inspect(3.141519), 3.141519);
  t.equal(inspect(true), true);
  t.equal(inspect(false), false);
  t.notEqual(inspect(NaN), NaN);
  t.equal(inspect(null), null);
  t.equal(inspect(), undefined);
  t.equal(inspect(Infinity), Infinity);
});
