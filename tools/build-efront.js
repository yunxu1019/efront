var path = require("path");
var fs = require("fs");
function getVersionByTime(rootpath, reverse) {

    return new Promise(function (ok) {
        var savedVersion = 0;
        var resolve = function () {
            ok(savedVersion);
        };
        var roots = [].concat(rootpath);
        var run = function () {
            if (!roots.length) return resolve();
            var filepath = roots.shift();
            fs.stat(filepath, function (error, stat) {
                if (error) return run();
                if (stat.isFile()) {
                    var { mtime } = stat;
                    if (mtime < savedVersion && reverse > 0) {
                        savedVersion = mtime;
                    } else if (mtime > savedVersion) {
                        savedVersion = mtime;
                    }
                } else {
                    fs.readdir(filepath, function (names) {
                        roots.push.apply(roots, names);
                        run();
                    });
                }
            })
        };
    })

}

Promise.all([
    fs.readdirSync(
        path.join(__dirname, '..')
    ).filter(a => !/^[\._]|^public$/i.test(a)),
    path.join(__dirname, '../public')
].map(getVersionByTime)).then(function ([srcVersion, dstVersion]) {
    if (srcVersion > dstVersion) {
        var fullpath = path.join(__dirname, 'build-efront');
        require("child_process").spawn(fullpath, {
            stdio: "inherit",
            shell: true
        });
    } else {
        console.log("已是最新版本！");
    }
});