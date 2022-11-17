require("../coms/efront/setupenv");
var path = require("path");
var fs = require("fs");
var console = global.console = require("../coms/reptile/colored_console.js");
var saveTo = require("../coms/basic/saveToOrderedArray");
global.isObject = require("../coms/basic/isObject");
var findIn = global.getIndexFromOrderedArray = require("../coms/basic/getIndexFromOrderedArray");
var strings = require("../coms/basic/strings");
var typescript_path = path.join(__dirname, '../coms/typescript');
var typescript_file = require.resolve(typescript_path);
var text = fs.readFileSync(typescript_file).toString();
var codes = text.split(/[\r\n]+var\s+ts/);
var parsed = [], marked = ["transpile"];
var typescript = require(typescript_file);
// codes.slice(1).forEach(function (text, id) {
//     var args = require("../coms/efront/commbuilder").break(text, "typescript.js", "typescript - " + id + ".js", false);
//     var created = [];
//     text.replace(/(?:^\s*|\()ts\.([\w\$]+)\s*=/mg, function (_, c) {
//         created.push(c);
//     });
//     parsed[id] = { text, created, marked: created.includes("Diagnostics") || created.includes("DiagnosticCategory"), id, strs: args[2] && args[2].map(strings.decode).filter(a => typescript.hasOwnProperty(a)) };
// });
// bigloop: while (true) {
//     let saved_length = marked.length;
//     for (let cx = 0, dx = parsed.length; cx < dx; cx++) {
//         let { created, strs, marked: mark } = parsed[cx];
//         if (mark || !strs) continue;
//         for (let s of created) {
//             if (/createScanner/.test(s)) console.log(cx);
//             if (marked[findIn(marked, s)] === s) {
//                 for (let s of strs) saveTo(marked, s);
//                 parsed[cx].marked = true;
//                 break;
//             }
//         }
//     }
//     if (marked.length === saved_length) break;
// }
// parsed = parsed.filter(a => a.marked);
// var codeText = [codes[0]].concat(parsed.map(a => a.text)).join("\r\nvar ts");
var date = new Date();
// var sign = `\r\n/**\r\n * 这一部分由工具重写\r\n * \r\n * Efront Authors\r\n * ${date.toISOString()}\r\n */\r\nmodule.exports = ts;`;
// var codeText = codeText.replace(/\(\s*\(?function\b[^\{]*\{\s*[^\}]*?\bglobalThis\b[\s\S]*$/, "");
// if (text.length > codeText.length) {
//     text = codeText + sign;
//     global.console.log(codeText.length, text.length);
//     fs.writeFileSync(typescript_file, text);
// }
var destpath = path.join(__dirname, '../coms/typescript-helpers');
var helpers = Object.keys(typescript).filter(k => /Helper$/.test(k)).map(k => typescript[k]).filter(o => o instanceof Object && o.text);
var helpersMap = {};
helpers.forEach(o => {
    var { importName, text } = o;
    if (importName) {
        console.test(importName, o.name);
        try {
            text = text.replace(/^[\r\n]+/, '');
            var space = /^\s+/.exec(text);
            if (space) {
                space = space[0];
                text = text.replace(new RegExp(`^\\s{${space.length}}`, 'mg'), '');
            }
            var distname = path.join(destpath, importName + ".js");
            helpersMap[importName] = true;
            var needWrite = true;
            if (fs.existsSync(distname)) {
                var temp = fs.readFileSync(distname).toString().replace(/^\s*\/\*[\s\S]*?\*\/\s*/, '');
                if (temp.replace(/[\r\n]+/g, "\r\n").trim() === text.replace(/[\r\n]+/g, "\r\n").trim()) needWrite = false;
            }
            if (needWrite) {
                text = `/**\r\n * ${o.name}\r\n * 这个文件由工具生成，请不要手动修改\r\n * \r\n * Efront Authors\r\n * ${date.toISOString()}\r\n */\r\n` + text;
                fs.writeFileSync(distname, text);
            }
            console.pass(importName, o.name);
        } catch (e) {
            console.fail(importName, e);
        }
    }
});
fs.readdirSync(destpath).forEach(n => {
    if (!helpersMap[n.replace(/\.js$/, '')]) fs.unlinkSync(path.join(destpath, n));
});