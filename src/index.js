var util = require('./util');
var deepInspect = require('./deep-inspect');
var archy = require('archy');

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
