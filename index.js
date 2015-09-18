/*jslint node: true */

var util = require('./util');

function deepInspect(obj, options) {
  if (util.isPrimitive(obj)) {
    return console.log(obj);
  }

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
  options = util.simpleClone(options || {});

  options.showHidden = options.showHidden || false;

  if (!util.isBoolean(options.showHidden)) {
    throw new TypeError('showHidden property must be a boolean');
  }

  options.childrenDepth = options.childrenDepth || 2;

  if (!util.isInteger(options.childrenDepth) || options.childrenDepth <= 0) {
    throw new TypeError(
      'childrenDepth property must be a positive, non-zero integer');
  }

  options.showInherited = options.showInherited || false;

  if (!util.isBoolean(options.showInherited)) {
    throw new TypeError('showInherited property must be a boolean');
  }

  options.inheritanceDepth = options.inheritanceDepth || 1;

  if (!util.isInteger(options.inheritanceDepth) ||
    options.inheritanceDepth <= 0) {
    throw new TypeError(
      'inheritanceDepth property must be a positive, non-zero integer');
  }

  deepInspect(obj, options);
}

module.exports = inspect;
