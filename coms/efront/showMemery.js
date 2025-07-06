var size = require("../basic/size");
var showMemery = process.resourceUsage ? function () {
    var m = process.resourceUsage().maxRSS * 1024;
    var { system, user } = process.cpuUsage();
    process.title = `${size(m)}, ${+(100 * user / (user + system)).toFixed(2)}%`;
} : function () { };
module.exports = showMemery;