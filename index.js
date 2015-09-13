/*jslint node: true */

'use strict';

function toString(obj) {
  return Object.prototype.toString.call(obj);
}

function isObject(obj) {
  return obj && toString(obj) === '[object Object]';
}

function isBoolean(obj) {
  return obj && toString(obj) === '[object Boolean]';
}

function isNumber(obj) {
  return obj && toString(obj) === '[object Number]';
}

function isInteger(obj) {
  if (Number.isInteger) {
    return Number.isInteger(obj);
  }

  return isNumber(obj) &&
         isFinite(obj) &&
         Math.floor(obj) === obj;
}

function simpleClone(obj, target) {
  var keys,
      i;

  if (!isObject(obj)) {
    throw new TypeError('Object to be cloned must be an Object');
  }

  target = target || {};
  keys = Object.keys(obj);
  i = keys.length;

  while (i--) {
    target[keys[i]] = obj[keys[i]];
  }

  return target;
}

function inspect(obj, options) {
  if (!isObject(obj)) {
    throw new TypeError('Only objects can be inspected');
  }

  options = simpleClone(options || {});

  if (options.showHidden === undefined) {
    options.showHidden = false;
  }

  if (!isBoolean(options.showHidden)) {
    throw new TypeError('showHidden property must be a boolean');
  }

  if (options.depth === undefined) {
    options.depth = 2;
  }

  if (!isInteger(options.depth) || options.depth <= 0) {
    throw new TypeError('depth property must be a positive, non-zero integer');
  }

  if (options.showInherited === undefined) {
    options.showInherited = false;
  }

  if (!isBoolean(options.showInherited)) {
    throw new TypeError('showInherited property must be a boolean');
  }

}
