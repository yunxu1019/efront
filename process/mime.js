"use strict";
var fs = require("fs");
var mime_data_file = "./data/mime.json";
var mimes = exports;
var watch = require("../process/watch");
var loadjson = require("../process/loadjson");

function buildMime() {
    var mime = loadjson(mime_data_file);
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
                mimes[value] = type;
            }
        }
    }
};
buildMime();
watch(mime_data_file, buildMime);