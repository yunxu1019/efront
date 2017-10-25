var os = require("os");
module.exports = function () {
    var networkInterfaces = os.networkInterfaces();
    var ips = [];
    for (var k in networkInterfaces) {
        var connections = networkInterfaces[k];
        connections.forEach(function (connection) {
            if (!/(?:0+:){5}(?:0+)/.test(connection.mac) && connection.family === "IPv4") ips.push(connection.address);
        });
    }
    return ips.join("|");
}