var reloadListener = require("./reloadListeners");
var size = require("../basic/size");
var showMemery = function () {
    var m = process.resourceUsage().maxRSS * 1024;
    var { system, user } = process.cpuUsage();
    process.title = `${size(m)}, ${+(100 * user / (user + system)).toFixed(2)}%`;
};
var timer = setInterval(showMemery, 12);
var finish = function (deltaTime) {
    clearInterval(timer);
    console.info(`完成，用时${deltaTime / 1000}秒，占用内存${size(process.resourceUsage().maxRSS * 1024)}。\r\n`);
    reloadListener.fire();
};
module.exports = finish;