var fs = require("fs");
var path = require("path");
var data = fs.readFileSync(path.join(__dirname, "../typescript/index.js")).toString();
// data='{ \r\na( ){ return a;} }';
function test(parser, name) {
    var time = new Date;
    var parsed = parser(data);
    // var scanned1 = scanner(`\`a\${b}c\``);
    console.log(new Date - time, name);
    return parsed;
}

var scanner = require("./scanner2");
var esprima = require("../esprima/index");
var scanned = test(scanner, 'scanner2');
console.log(scanned.toString().slice(0, 1000));
test(esprima.parse, 'esprima.parse');
test(esprima.tokenize, 'esprima.tokenize');

// var typescript = require("../typescript/index");
// typescript.transpile(data.toString(), { noEmitHelpers: true });