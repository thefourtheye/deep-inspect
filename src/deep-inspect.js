var util = require('./util');

function deepInspect(obj, options, cLevel, pLevel, isParent) {
  var parent = (isParent ? "[[Parent]] : " : "");

  if (util.isPrimitive(obj) || cLevel === options.depth ||
    pLevel === options.parentChainLevel) {
    return parent + util.format(obj);
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
      return '[Function "' + (obj.name || 'Anonymous') + '"]\n';
    }
    return parent + util.toString(obj) + '\n';
  }

  var result = {};
  result.label = parent + util.getTypeName(obj);
  result.nodes = [];

  if (options.parentChainLevel) {
    result.nodes.push(deepInspect(Object.getPrototypeOf(obj),
      options, 0, pLevel + 1, true));
  }

  var indexRE = /^["]?\d+["]?$/;

  result.nodes = result.nodes.concat(keys.map(function (key) {
    var fKey = util.format(key);
    var title = Array.isArray(obj) && indexRE.test(fKey) ? 'Index: ' :
      'Key: ';
    var value;
    try {
      value = obj[key];
    } catch (ex) {
      value = ex.message;
    }
    return {
      label: title + fKey,
      nodes: [deepInspect(value, options, cLevel + 1, pLevel)]
    };
  }));

  return result;
}

module.exports = deepInspect;
