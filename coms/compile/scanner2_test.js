var fs = require("fs");
var path = require("path");
var scanner = require("./scanner2");
var data = fs.readFileSync(path.join(__dirname, "../typescript/index.js")).toString();
var data2 = fs.readFileSync(path.join(__dirname, "./scanner2.js")).toString();
// data='{ \r\na( ){ return a;} }';
function test(parser, name) {
    var time = new Date;
    var parsed = parser(data);
    // var scanned1 = scanner(`\`a\${b}c\``);
    console.log(new Date - time, name);
    return parsed;
}
function testSpeed() {

    var esprima = require("../esprima/index");
    var scanned = test(scanner, 'scanner2');
    var start = new Date();
    var data3 = scanned.press().toString();
    console.log(new Date - start, 'press().toString()');
    fs.writeFileSync(path.join(__dirname, "./scanner2_temp.js"), data3);

    test(esprima.parse, 'esprima.parse');
    test(esprima.tokenize, 'esprima.tokenize');
}

function testVariables() {
    var globals = scanner(data2).getUndecleared();
    console.log(globals);
}
// testSpeed();
testVariables();
// var typescript = require("../typescript/index");
// typescript.transpile(data.toString(), { noEmitHelpers: true });