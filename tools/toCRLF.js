var fs = require("fs");
var path = require("path");
/**
 * 把dir中的文件的换行符号替换成\r\n chr(13)+chr(10)
 * @param {string} dir 指向一个文件或文件夹
 */
var replace = function (dir, deep) {
    if (!fs.existsSync(dir)) {
        return console.warn(`指定的路径${dir}不存在!`);
    }
    if (dir.match(/node_modules/)) {
        if (typeof deep !== "number") {
            return console.error("不要在这个层级未知的地方下手！");
        }
    }
    if (deep < 0) {
        return;
    }
    if (fs.statSync(dir).isDirectory()) {
        fs.readdirSync(dir).forEach(function (name) {
            replace(path.join(dir, name), deep - 1);
        });
    } else if (dir.match(/\.(?:jsx?|css|less|html?|md|json|h|c|cc|cpp|inc)$/)) {
        var buffer = fs.readFileSync(dir);
        var data = String(buffer).replace(/\r\n|\r|\n|\u2028|\u2029/g, "\r\n");
        fs.writeFileSync(dir, data);
        console.log(dir);
    }
}
replace("./", 5);