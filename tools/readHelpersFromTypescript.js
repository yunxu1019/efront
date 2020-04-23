var path = require("path");
var fs = require("fs");
var console = require("../coms/basic/colored_console.js");
var typescript_path = path.join(__dirname, '../coms/typescript');
var typescript_file = require.resolve(typescript_path);
var text = fs.readFileSync(typescript_file).toString();
var date = new Date();
var sign = `\r\n/**\r\n * 这一部分由工具重写\r\n * \r\n * Efront Authors\r\n * ${date.toISOString()}\r\n */\r\nmodule.exports = ts;`;
var codeText = text.replace(/\(\s*\(?function\b[^\{]*\{\s*[^\}]*?\bglobalThis\b[\s\S]*$/, "");
if (text.length > codeText.length) {
    text = codeText + sign;
    global.console.log(codeText.length, text.length);
    fs.writeFileSync(typescript_file, text);
}
var destpath = path.join(__dirname, '../coms/typescript-helpers');
var typescript = require(typescript_path);
var helpers = Object.keys(typescript).filter(k => /Helper$/.test(k)).map(k => typescript[k]).filter(o => o instanceof Object && o.text);
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
            if (fs.existsSync(distname)) {
                var temp = fs.readFileSync(distname).toString().replace(/^\s*\/\*[\s\S]*?\*\/\s*/, '');
                if (temp.replace(/[\r\n]+/g, "\r\n").trim() === text.replace(/[\r\n]+/g, "\r\n").trim());
            } else {
                text = `/**\r\n * ${o.name}\r\n * 这个文件由工具生成，请不要手动修改\r\n * \r\n * Efront Authors\r\n * ${date.toISOString()}\r\n */\r\n` + text;
                fs.writeFileSync(distname, text);
            }
            console.pass(importName, o.name);
        } catch (e) {
            console.fail(importName, e);
        }
    }
});

