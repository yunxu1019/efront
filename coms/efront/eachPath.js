var fs = require("fs");
var path = require("path");
var fsp = fs.promises;
module.exports = async function (root, find) {
    var rest = [root];
    var total = rest.length;
    while (rest.length) {
        var fullpath = rest.pop();
        if (!fs.existsSync(fullpath)) {
            console.error(i18n`路径不存在:`, fullpath);
            continue;
        }
        try {
            var stats = await fsp.stat(fullpath);
            if (stats.isDirectory()) {
                var names = await fsp.readdir(fullpath);
                names = names.filter(a => !/\_(?:test|temp)\.\w+$/.test(a));
                rest.push.apply(rest, names.map(n => path.join(fullpath, n)));
                total += names.length - 1;
                continue;
            }
            if (stats.isFile()) {
                var data = await fsp.readFile(fullpath);
                data = String(data).replace(/^\s*#!/, '//');
                await find(data, fullpath);
            }
        } catch (e) {
            //<!--console.log(e)-->
            console.error(i18n`读取出错了，路径:`, fullpath);
        }
    }
    return total;
}