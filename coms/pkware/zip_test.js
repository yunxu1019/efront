var fs = window.require("fs");
var path = window.require("path");
var targetzip = path.join(__dirname, "../public/test.zip");
var h = fs.openSync(targetzip, 'w');
var z = new zip(function (data, callback) {
    fs.writeSync(h, data);
    callback();
});


var run = function (root) {
    var folders = [], files = [], rest = [];
    var l = function (n) {
        console.log(n)
        var p = path.join(this, n.name);
        if (n.isFile()) {
            files.push(p);
        } else {
            rest.push(p);
        }
    };
    var r = function () {
        if (!rest.length) return t();
        var f = rest.pop();
        console.log(f);
        fs.readdir(f, {
            withFileTypes: true
        }, function (error, a) {
            if (error) return console.error(error);
            if (!a.length) {
                folders.push(f);
            }
            a.forEach(l, f);
            r();
        });

    };
    var t = function () {
        files.forEach(function (f) {
            fs.stat(f, function (error, stats) {
                z.addFile(files);
            })
        })
        console.log(folders, files, z);
    };
    [root].map(a => extend(fs.statSync(a), { name: a })).forEach(l, ''), r();

}

run('/work/efront/public');
