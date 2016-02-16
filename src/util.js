'use strict';

function toString(obj) {
  return Object.prototype.toString.call(obj);
}

function isFunction(obj) {
  return toString(obj) === '[object Function]';
}

function isString(obj) {
  return toString(obj) === '[object String]';
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

function isSymbol(obj) {
  return toString(obj) === '[object Symbol]';
}

function getTypeName(obj) {
  var type = toString(obj).replace('[object ', '').replace(']', '');
  if (type === 'Function') {
    return '[Function ' + obj.name + ']';
  }
  return type;
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

var hasSymbolsSupport = true;

try {
  hasSymbolsSupport = typeof Symbol === 'function';
} catch (ex) {
  hasSymbolsSupport = false;
}

function format(obj) {
  if (module.exports.hasSymbolsSupport && isSymbol(obj)) {
    return obj.toString();
  }

  if (isPrimitive(obj)) {
    return isString(obj) ? '"' + obj + '"' : String(obj);
  }

  return getTypeName(obj);
}

var hasArrowFunctions = true;

try {
  (new Function('() => 1'))();
} catch (ex) {
  hasArrowFunctions = false;
}

module.exports = {
  toString: toString,
  isObject: isObject,
  isBoolean: isBoolean,
  isNumber: isNumber,
  isPrimitive: isPrimitive,
  isInteger: isInteger,
  isFunction: isFunction,
  simpleClone: simpleClone,
  format: format,
  getTypeName: getTypeName,
  hasSymbolsSupport: hasSymbolsSupport,
  hasArrowFunctions: hasArrowFunctions
};
