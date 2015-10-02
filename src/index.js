var util = require('./util');
var archy = require('archy');

function deepInspect(obj, options, cLevel, pLevel) {
  if (util.isPrimitive(obj) || cLevel === options.childrenDepth ||
    (options.showInherited && pLevel === options.inheritanceDepth)) {
    return util.format(obj);
  }

  var keys;

  if (options.showHidden) {
    keys = Object.getOwnPropertyNames(obj);
    if (util.hasSymbolsSupport) {
      keys = keys.concat(Object.getOwnPropertySymbols(obj));
    }
  } else {
    keys = Object.keys(obj);
  }

  if (keys.length === 0) {
    if (util.isObject(obj)) {
      return '{}\n';
    }
    if (Array.isArray(obj)) {
      return '[]\n';
    }
    if (util.isFunction(obj)) {
      return '[Function "' + obj.name + '"]\n';
    }
    throw new TypeError('Unexpected type: ' + util.toString(obj));
  }

  var result = {};
  result.label = util.getTypeName(obj);
  result.nodes = [];

  if (options.showInherited) {
    result.nodes.push(deepInspect(Object.getPrototypeOf(obj),
      options, cLevel, pLevel + 1));
  }

  var title = Array.isArray(obj) ? 'Index: ' : 'Key: ';

  result.nodes = result.nodes.concat(keys.map(function (key) {
    return {
      label: title + util.format(key),
      nodes: [deepInspect(obj[key], options, cLevel + 1, pLevel)]
    };
  }));

  return result;
}

function inspect(obj, options) {
  options = util.simpleClone(options || {});

  options.showHidden = options.showHidden || false;

  if (!util.isBoolean(options.showHidden)) {
    throw new TypeError('showHidden property must be a boolean');
  }

  options.childrenDepth = options.childrenDepth || 1;

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

  var result = deepInspect(obj, options, 0, 0);

  if (util.isPrimitive(result)) {
    console.log(result);
  } else {
    console.log(archy(result));
  }
}

module.exports = inspect;
