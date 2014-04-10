var fs = require('fs'),
    JSON5 = require('json5');

var loose = fs.readFileSync(process.argv[2], 'utf8');
var obj = JSON5.parse(loose);
var strict = JSON.stringify(obj);
fs.writeFileSync(process.argv[2] + '-strict', strict, 'utf8');
