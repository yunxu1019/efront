"use strict";
var os = require("os");
module.exports = function () {
    var networkInterfaces = os.networkInterfaces();
    var ips = [];
    for (var k in networkInterfaces) {
        var faces = networkInterfaces[k];
        faces.forEach(function (f) {
            if (!f.internal && f.family === "IPv4") ips.push(f.address);
        });
    }
    return ips.join("|");
}