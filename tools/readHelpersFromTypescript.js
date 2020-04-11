var path = require("path");
var fs = require("fs");
var console = require("../process/console.js");
var typescript_path = path.join(__dirname, '../process/typescript');
var destpath = path.join(__dirname, '../coms/typescript');
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
            var date = new Date();
            text = `/**\r\n * ${o.name}\r\n * 这个文件由工具生成，请不要手动修改\r\n * \r\n * Efront Authors\r\n * ${date.toISOString()}\r\n */\r\n` + text;
            fs.writeFileSync(path.join(destpath, importName + ".js"), text);
            console.pass(importName, o.name);
        } catch (e) {
            console.fail(importName, e);
        }
    }
});
