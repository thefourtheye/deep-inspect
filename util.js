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
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' ||
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

module.exports = {
  toString: toString,
  isObject: isObject,
  isBoolean: isBoolean,
  isNumber: isNumber,
  isPrimitive: isPrimitive,
  isInteger: isInteger,
  simpleClone: simpleClone
}