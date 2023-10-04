"use ../../data/mime.json";
var mime_data_file = mime;
var mimes = exports;
function cust(mime) {
    for (var k in mimes) {
        if (!(k in mime)) {
            delete mimes[k];
        }
    }
    for (var k in mime) {
        var m = mime[k];
        for (var cx = 0, dx = m.length; cx < dx; cx++) {
            var temp = String(m[cx]);
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
cust(mime);