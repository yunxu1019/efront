var reloadListener = require("./reloadListeners");
var size = require("../basic/size");

var finish = function (deltaTime) {
    if (process.resourceUsage) {
        var memery = i18n`，占用内存 ${size(process.resourceUsage().maxRSS * 1024)}`;
    }
    console.info(i18n`完成，用时${deltaTime / 1000}秒${memery ? memery : ''}。\r\n`);
    reloadListener.fire();
};
module.exports = finish;