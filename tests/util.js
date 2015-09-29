var util = require('../src/util.js');
var inspect = require('../src/index');
var originalLogger = console.log;
var result = '';

function patchLogger() {
  console.log = function (data) {
    result = data;
  };
}

function restoreLogger() {
  console.log = originalLogger;
}

function getTestResult(data, options) {
  inspect(data, options);
  // If it is not a primitive, strip the new line at the end
  return util.isPrimitive(data) ? result : result.slice(0, -1);
}

module.exports = {
  patchLogger: patchLogger,
  restoreLogger: restoreLogger,
  getTestResult: getTestResult,
  hasSymbolsSupport: util.hasSymbolsSupport
};
