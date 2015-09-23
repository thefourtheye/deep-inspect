'use strict';

function toString(obj) {
  return Object.prototype.toString.call(obj);
}

function isString(obj) {
  return obj && toString(obj) === '[object String]';
}

function isObject(obj) {
  return obj && toString(obj) === '[object Object]';
}

function isBoolean(obj) {
  return toString(obj) === '[object Boolean]';
}

function isNumber(obj) {
  return toString(obj) === '[object Number]';
}

function format(obj) {
  return isString(obj) ? '\'' + obj + '\'' : String(obj);
}

function getTypeName(obj) {
  return toString(obj).replace('[object ', '').replace(']', '');
}

// Source: isaacs's core-util-is library
function isPrimitive(arg) {
  return arg === null ||
    typeof arg === 'boolean' ||
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' ||
    arg === undefined;
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
  simpleClone: simpleClone,
  format: format,
  getTypeName: getTypeName
};
