var test = require('tape');
var util = require('./util');

test('Inherited properties test', function (t) {
  util.patchLogger();

  t.plan(2);

  t.equal(util.getTestResult({}, {
    parentChainLevel: 2
  }), [
    'Object',
    '└─┬ [[Parent]] : Object',
    '  └── [[Parent]] : null'
  ].join('\n'));

  function Parent() {}
  Parent.prototype.name = 'Parent';

  function Child() {}
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;

  t.equal(util.getTestResult(new Child(), {
    parentChainLevel: 4
  }), [
    'Object',
    '└─┬ [[Parent]] : Object',
    '  ├─┬ [[Parent]] : Object',
    '  │ ├─┬ [[Parent]] : Object',
    '  │ │ └── [[Parent]] : null',
    '  │ └─┬ Key: "name"',
    '  │   └── "Parent"',
    '  └─┬ Key: "constructor"',
    '    └── [Function Child]'
  ].join('\n'));

  util.restoreLogger();
});
