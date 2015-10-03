var util = require('./util');
var archy = require('archy');

function deepInspect(obj, options, cLevel, pLevel) {
  if (util.isPrimitive(obj) || cLevel === options.depth ||
    pLevel === options.parentChainLevel) {
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

  if (keys.length === 0 && !options.parentChainLevel) {
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

  if (options.parentChainLevel) {
    result.nodes.push(deepInspect(Object.getPrototypeOf(obj),
      options, 0, pLevel + 1));
  }

  var indexRE = /^["]?\d+["]?$/;

  result.nodes = result.nodes.concat(keys.map(function (key) {
    var fKey = util.format(key);
    var title = Array.isArray(obj) && indexRE.test(fKey) ? 'Index: ' :
      'Key: ';
    return {
      label: title + fKey,
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

  options.depth = options.depth || 1;

  if (!util.isInteger(options.depth) || options.depth <= 0) {
    throw new TypeError(
      'depth property must be a positive, non-zero integer');
  }

  if (options.parentChainLevel !== undefined) {
    if (!util.isInteger(options.parentChainLevel) ||
      options.parentChainLevel <= 0) {
      throw new TypeError(
        'parentChainLevel property must be a positive, non-zero integer');
    }
  }

  var result = deepInspect(obj, options, 0, 0);

  if (util.isPrimitive(result)) {
    console.log(result);
  } else {
    console.log(archy(result));
  }
}

module.exports = inspect;
