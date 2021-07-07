var fs = require("fs");
var path = require("path");
var data = fs.readFileSync(path.join(__dirname, "../typescript/index.js")).toString();
var data2 = fs.readFileSync(path.join(__dirname, "./scanner2.js")).toString();
// data='{ \r\na( ){ return a;} }';
function test(parser, name) {
    var time = new Date;
    var parsed = parser(data2);
    // var scanned1 = scanner(`\`a\${b}c\``);
    console.log(new Date - time, name);
    return parsed;
}

var scanner = require("./scanner2");
var esprima = require("../esprima/index");
var scanned = test(scanner, 'scanner2');
var data3 = scanned.press().toString();
fs.writeFileSync(path.join(__dirname, "./scanner2_temp.js"), data3);

test(esprima.parse, 'esprima.parse');
test(esprima.tokenize, 'esprima.tokenize');

// var typescript = require("../typescript/index");
// typescript.transpile(data.toString(), { noEmitHelpers: true });