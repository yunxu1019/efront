var fs = require("fs");
var path = require("path");
var esprima = require("../esprima/index");
var typescript = require("../typescript/index");
var console = require("../efront/colored_console");
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

    var scanned = test(scanner, 'scanner2');
    var start = new Date();
    var data3 = scanned.press().toString();
    console.log(new Date - start, 'press().toString()');
    fs.writeFileSync(path.join(__dirname, "./scanner2_temp.js"), data3);

    test(esprima.parse, 'esprima.parse');
    test(esprima.tokenize, 'esprima.tokenize');
}

function testVariables() {
    var rootpath = path.join(__dirname, "../zimoli/");
    var getVariables = require("./variables");
    var names = fs.readdirSync(rootpath);
    names.forEach(n => {
        if (!/\.js$/i.test(n)) return;
        var data3 = fs.readFileSync(path.join(rootpath, n)).toString().replace(/^\s*#!/, '//');
        try {
            var jst = esprima.parse(data3);
        } catch (e) {
            data3 = typescript.transpile(data3);
            jst = esprima.parse(data3);
        }
        console.info(n);
        if (n === "autodragchildren.js") debugger;
        var globals = scanner(data3).getUndecleared();
        var {
            unDeclaredVariables: undeclares
        } = getVariables(jst);
        var warn = false;
        for (var k in globals) {
            if (!(k in undeclares)) {
                warn = true;
                if (warn) console.warn(n, k, 'globals:', globals[k], 'undeclared:', undeclares[k]);
            }
        }
        for (var k in undeclares) {
            if (!(k in globals)) {
                warn = true;
                if (warn) console.warn(n, k, 'globals:', globals[k], 'undeclared:', undeclares[k]);
            }
        }


    })
}
// testSpeed();
testVariables();
// var typescript = require("../typescript/index");
// typescript.transpile(data.toString(), { noEmitHelpers: true });