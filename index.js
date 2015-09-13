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

// Source: isaacs's core-util-is library
function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number'  ||
         typeof arg === 'string'  ||
         typeof arg === 'symbol'  ||
         typeof arg === 'undefined';
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

function deepInspect(obj, options) {
  var keys,
      i;

  if (options.showHidden) {
    keys = Object.getOwnPropertyNames(obj);
    keys = keys.concat(Object.getOwnPropertySymbols(obj));
  } else {
    keys = Object.keys(obj);
  }
}

function inspect(obj, options) {
  if (isPrimitive(obj)) {
    throw new TypeError('Primitives cannot be inspected');
  }

  options = simpleClone(options || {});

  options.showHidden = options.showHidden || false;

  if (!isBoolean(options.showHidden)) {
    throw new TypeError('showHidden property must be a boolean');
  }

  options.childrenDepth = options.childrenDepth || 2;

  if (!isInteger(options.childrenDepth) || options.childrenDepth <= 0) {
    throw new TypeError(
        'childrenDepth property must be a positive, non-zero integer');
  }

  options.showInherited = options.showInherited || false;

  if (!isBoolean(options.showInherited)) {
    throw new TypeError('showInherited property must be a boolean');
  }

  options.inheritanceDepth = options.inheritanceDepth || 1;

  if (!isInteger(options.inheritanceDepth) || options.inheritanceDepth <= 0) {
    throw new TypeError(
        'inheritanceDepth property must be a positive, non-zero integer');
  }

  deepInspect(obj, options);
}
