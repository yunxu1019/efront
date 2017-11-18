/**
 * 只在主线程中使用
 */
if(!require("cluster").isMaster){
    throw "只在主线程中使用";
}
module.exports = function (a) {
    return arguments.length > 0 ? save(a) : load();
}
var fs = require("fs");
var data_file = "./data/count.json";

function load() {
    try {
        var data = fs.readFileSync(data_file);
        return JSON.parse(String(data))||{};
    } catch (e) {
        return {};
    }
}

function save(data) {
    data instanceof Object && fs.writeFileSync(data_file, JSON.stringify(data));
}