var fs = require("fs");
var path = require("path");
var esprima// = require("../esprima/index");
// var typescript = require("../typescript/index");
var console = require("../reptile/colored_console");
var scanner = require("./scanner2");
var data //= fs.readFileSync(path.join(__dirname, "../typescript/index.js")).toString();
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

    console.log(data.slice(6426300, 6426400))
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
    var getVariables //= require("./variables");
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
        if (n === "grid.js") debugger;
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
function testRegexp() {
    var m = scanner(`/${/[^\u0130\u0131\u00DFa-z0-9\\/:\-_\. ]+/g.source}/g/** a */`)
    console.log(m)
}
function testStatic() {
    var m = scanner(`class a{static{console.log(1)}}`);
    console.log(m);
}
function testAssign() {
    var m = scanner(`a=function(){}
    a()`);
    console.log(m.press().toString());
}
function testArrow() {
    var m = scanner(`(a)=>(b)=>{c,b};`);
    console.log("1", m.envs);
    var m = scanner(`(a,b)=>{c,b};`);
    console.log("2", m.envs);
}

function testFormat() {
    var t = fs.readFileSync(path.join(__dirname, "../efront/memery.js")).toString();
    assert(scanner(t).toString(), t);
}
function testJsx() {
    var m = `render() { return expression.map((item, index) => <Component1></Component1>) }`;
    assert(scanner(m).toString(), m);
}
function testJsx2() {
    var m = `return <Copoment1 onClick={onclick}>{webcontent}</Component1>`;
    assert(scanner(m).toString(), m);
}
function testJsx3() {
    var m = scanner(`return <a></b></c>`);
}
function testJsxOnlyHtml() {
    var m = scanner(`<!-- angular 1.x -->
    <component1 ng-bind="expression"><child1></child1></component1>`);
    console.log(m.toString());
}
function testSpaceLess() {
    var m = scanner(`if(n<0)return'_f("'+t+'")('+e+")"`);
    console.log(m.toString());
}
function testUnicode() {
    var m = scanner(`\\u{0042}\\u0042=1`);
    console.log(m.toString())
}
Program.debug = true;
// testSpeed();
// testVariables();
// testRegexp();
// testStatic();
// testAssign();
// testFormat();
// testJsx();
// testJsx2();
// testJsx3();
// testJsxOnlyHtml();
// testSpaceLess();
// testArrow();
testUnicode();
// var typescript = require("../typescript/index");
// typescript.transpile(data.toString(), { noEmitHelpers: true });