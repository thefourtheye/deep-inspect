#!/usr/bin/env node

var spawn = require('child_process').spawn;
var fs = require('fs');

if (process.env.CI) {
  var args = ['./node_modules/coveralls/bin/coveralls'];
  var child = spawn(process.execPath, args, {
    stdio: ['pipe', 1, 2, 'ipc']
  });
  fs.createReadStream('coverage/lcov.info').pipe(child.stdin);
} else {
  console.log('Skipping publishing coverage report.');
}
