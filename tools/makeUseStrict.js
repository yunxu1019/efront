"use strict";
var fs = require("fs");
var path = require("path");
/**
 * 把dir中的文件的换行符号替换成\r\n chr(13)+chr(10)
 * @param {string} dir 指向一个文件或文件夹
 */
var replace = function (dir, deep) {
    if (!fs.existsSync(dir)) {
        return console.warn(i18n`指定的路径${dir}不存在!`);
    }
    if (dir.match(/node_modules/)) {
        if (typeof deep !== "number") {
            return console.error(i18n`不要在这个层级未知的地方下手！`);
        }
    }
    if (deep < 0) {
        return;
    }
    if (fs.statSync(dir).isDirectory()) {
        --deep;
        fs.readdirSync(dir).forEach(function (name) {
            replace(path.join(dir, name), deep);
        });
    } else if (dir.match(/\.(?:jsx?)$/)) {
        var buffer = fs.readFileSync(dir);
        var code = String(buffer);
        if (/(["'`])user? strict\1/i.test(code)) {

            var data = code.replace(/^(?:\s*(["'`])user? strict\1\s*;?\s*[\r\n]*)+/i, "\"use strict\";\r\n");
            if (code !== data) fs.writeFileSync(dir, data), console.log(dir);
        }
    }
}
replace(path.join(__dirname, "../coms"), 5);