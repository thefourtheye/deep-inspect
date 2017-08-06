# deep-inspect

[![Greenkeeper badge](https://badges.greenkeeper.io/thefourtheye/deep-inspect.svg)](https://greenkeeper.io/)
A function to inspect inherited properties as well

[![NPM](https://nodei.co/npm/deep-inspect.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/deep-inspect)

[![Build
Status](https://travis-ci.org/thefourtheye/deep-inspect.svg?branch=master)](https://travis-ci.org/thefourtheye/deep-inspect)
[![Coverage
Status](https://coveralls.io/repos/thefourtheye/deep-inspect/badge.svg?branch=master&service=github)](https://coveralls.io/github/thefourtheye/deep-inspect?branch=master)
[![npm version](https://badge.fury.io/js/deep-inspect.svg)](https://badge.fury.io/js/deep-inspect)
[![David DM](https://david-dm.org/thefourtheye/deep-inspect.svg)](https://david-dm.org/thefourtheye/deep-inspect.svg)

## Installation

    npm install deep-inspect

## Options

The second argument to this function will be an `options` object. It
accepts the following values. Please note that all are optional fields.

* `showHidden`
* `depth`
* `parentChainLevel`

See below for explanations of the options.

### `showHidden`

Setting this option to `true` will show all the enumerable properties of the
object. Normally, when you iterate an object with a `for..in` loop or with
`Object.keys`, the non-enumerable properties will not be shown.

This must be a boolean value and the default value is `false`.

### `depth`

If the object is nested structure or the object has many child properties then
setting this option to a valid positive 32 bit integer value, will list all the
properties of the nested structure as well, till the level specified by `depth`
is reached.

This must be a valid 32 bit integer value and the default value is `1`.

### `parentChainLevel`

This option allows to explore the inheritance chain as well. It will go to the
depth mentioned in `parentChainLevel` and list down all the properties of all
the objects on the way.

There is no default value, but if not provided this will be ignored and none of
the parent objects in the prototype chain will be inspected.

## Usage

### Inspecting primitives

```js
var inspect = require('deep-inspect');
inspect(1);
// 1
inspect('thefourtheye');
// "thefourtheye"
inspect();
// undefined
```

### Inspecting simple objects

```js
var inspect = require('deep-inspect');
inspect([]);
// []
inspect({});
// {}
inspect({1: '2'});
// Object
// └─┬ Key: "1"',
//   └── "2"'
```

### Inspecting hidden (non-enumerable) properties

```js
var inspect = require('deep-inspect');
var a = {};
Object.defineProperties(a, {
    one: {enumerable: true,  value: 'one'},
    two: {enumerable: false, value: 'two'},
});
inspect(a, {showHidden: true});
// Object
// ├─┬ Key: "one"
// │ └── "one"
// └─┬ Key: "two"
//   └── "two"
inspect(a);
// Object
// └─┬ Key: "one"
//   └── "one"
```

### Inspecting inheritance chain (inherited properties)

```js
var inspect = require('deep-inspect');
function Parent() {}
Parent.prototype.name = 'Parent';

function Child() {}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

inspect(new Child(), {parentChainLevel: 4});
// Object
// └─┬ [[Parent]] : Object
//   ├─┬ [[Parent]] : Object
//   │ ├─┬ [[Parent]] : Object
//   │ │ └── [[Parent]] : null
//   │ └─┬ Key: "name"
//   │   └── "Parent"
//   └─┬ Key: "constructor"
//     └── [Function Child]
```
