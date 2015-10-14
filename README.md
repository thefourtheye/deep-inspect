# deep-inspect
A function to inspect inherited properties as well

[![Build
Status](https://travis-ci.org/thefourtheye/deep-inspect.svg?branch=master)](https://travis-ci.org/thefourtheye/deep-inspect)
[![Coverage
Status](https://coveralls.io/repos/thefourtheye/deep-inspect/badge.svg?branch=master&service=github)](https://coveralls.io/github/thefourtheye/deep-inspect?branch=master)

## Installation

    npm install deep-inspect

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
