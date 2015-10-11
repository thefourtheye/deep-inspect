var test = require('tape');
var util = require('./util');

test.createStream()
  .pipe(require('tap-spec'))
  .pipe(process.stderr);

test('Inherited properties test', function (t) {
  util.patchLogger();

  t.plan(3);

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

  function testRestrictedProperties(fn) {
    Object.getPrototypeOf(fn)['arguments'];
  }

  var restrictedProperties = null, restrictedFunctionName = 'Empty';
  try {
    testRestrictedProperties(Child);
  } catch (ex) {
    restrictedFunctionName = '';
    restrictedProperties = '"\'caller\' and \'arguments\' are restricted ' +
                           'function properties and cannot be accessed in ' +
                           'this context."';
  }

  t.equal(util.getTestResult(Child, {parentChainLevel: 2, showHidden: true}), [
    '[Function Child]',
    '├─┬ [[Parent]] : [Function ' + restrictedFunctionName + ']',
    '│ ├── [[Parent]] : Object',
    '│ ├─┬ Key: "length"',
    '│ │ └── 0',
    '│ ├─┬ Key: "name"',
    '│ │ └── "' + restrictedFunctionName + '"',
    '│ ├─┬ Key: "arguments"',
    '│ │ └── ' + restrictedProperties,
    '│ ├─┬ Key: "caller"',
    '│ │ └── ' + restrictedProperties,
    '│ ├─┬ Key: "constructor"',
    '│ │ └── [Function Function]',
    '│ ├─┬ Key: "bind"',
    '│ │ └── [Function bind]',
    '│ ├─┬ Key: "toString"',
    '│ │ └── [Function toString]',
    '│ ├─┬ Key: "call"',
    '│ │ └── [Function call]',
    '│ └─┬ Key: "apply"',
    '│   └── [Function apply]',
    '├─┬ Key: "length"',
    '│ └── 0',
    '├─┬ Key: "name"',
    '│ └── "Child"',
    '├─┬ Key: "arguments"',
    '│ └── null',
    '├─┬ Key: "caller"',
    '│ └── null',
    '└─┬ Key: "prototype"',
    '  └── Object'
  ].join('\n'));

  util.restoreLogger();
});
