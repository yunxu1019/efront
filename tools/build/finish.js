var reloadListener = require("./reloadListeners");
var finish = function (deltaTime) {
    console.info(`完成，用时${deltaTime / 1000}秒。\r\n`);
    reloadListener.fire();
};
module.exports = finish;