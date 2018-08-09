var mime_data_file = require("path").join(__dirname, "../data/mime.json");
var fs = require("fs");
fs.watch = () => { };
var mimes = require("./mime");
var loadjson = require("../process/loadjson");

function testMime() {
    var mime = loadjson(mime_data_file);
    for (var k in mime) {
        var m = mime[k];
        for (var cx = 0, dx = m.length; cx < dx; cx++) {
            var temp = m[cx];
            var i = temp.indexOf(":");
            var type = temp.slice(0, i);
            var exts = temp.slice(i + 1).split("|");
            for (var cy = 0, dy = exts.length; cy < dy; cy++) {
                var value = exts[cy];
                if (mimes[value] !== type)
                    console.warn({
                        "-extension": value,
                        "mime-type": type,
                        "responed-type": mimes[value]
                    });
            }
        }
    }
}
testMime();

