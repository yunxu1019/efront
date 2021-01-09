"use strict";
var mime_data_file = require("path").join(__dirname, "../../data/mime.json");
var mimes = exports;
var loadjson = require("../efront/loadjson").async;
function cust(mime) {
    for (var k in mimes) {
        if (!(k in mime)) {
            delete mimes[k];
        }
    }
    for (var k in mime) {
        var m = mime[k];
        for (var cx = 0, dx = m.length; cx < dx; cx++) {
            var temp = m[cx];
            var i = temp.indexOf(":");
            var type = temp.slice(0, i);
            var exts = temp.slice(i + 1).split("|");
            for (var cy = 0, dy = exts.length; cy < dy; cy++) {
                var value = exts[cy];
                if (mimes[value] !== type) mimes[value] = type;
            }
        }
    }
}
function buildMime() {
    loadjson(mime_data_file).then(cust).catch(console.error);
};
buildMime();