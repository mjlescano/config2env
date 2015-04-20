var changeCase = require('change-case');

module.exports = function parse(file) {
  var vars = [];
  var json = require(file);
  for (var key in json) {
    parseRecursive(key, json[key], vars);
  }

  return vars;
}

function parseRecursive(key, value, vars, prev) {
  if (value instanceof Array) {
    // We don't support arrays of object nor nested arrays
    vars.push({ env: convertKey(key, prev), value: value.join(',') });
  } else if ('object' === typeof value) {
    for (var subKey in value) {
      parseRecursive(subKey, value[subKey], vars, convertKey(key, prev));
    }
  } else {
    vars.push({ env: convertKey(key, prev), value: value });
  }
}

function convertKey(key, prev) {
  return changeCase.constantCase(prev ? prev + '_' + key : key);
}
