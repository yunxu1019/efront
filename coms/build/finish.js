var reloadListener = require("./reloadListeners");
var size = require("../basic/size");
if (process.resourceUsage) {
    var showMemery = function () {
        var m = process.resourceUsage().maxRSS * 1024;
        var { system, user } = process.cpuUsage();
        process.title = `${size(m)}, ${+(100 * user / (user + system)).toFixed(2)}%`;
    };
    var timer = setInterval(showMemery, 12);
}
var finish = function (deltaTime) {
    if (timer > 0) {
        clearInterval(timer);
        var memery = `，占用内存 ${size(process.resourceUsage().maxRSS * 1024)}`;
    }
    console.info(`完成，用时${deltaTime / 1000}秒${memery ? memery : ''}。\r\n`);
    reloadListener.fire();
};
module.exports = finish;