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
                    if (!savedVersion) {
                        savedVersion = mtime;
                    }
                    if (mtime < savedVersion && reverse > 0) {
                        savedVersion = mtime;
                    } else if (mtime > savedVersion) {
                        savedVersion = mtime;
                    }
                    run();
                } else {
                    fs.readdir(filepath, function (error, names) {
                        if (error) return run();
                        if (names) roots.push.apply(roots, names.map(name => path.join(filepath, name)));
                        run();
                    });
                }
            })
        };
        run();
    })

}

Promise.all([
    fs.readdirSync(
        path.join(__dirname, '..')
    ).filter(a => !/^[\._]|^public$|^build\-efront\.js$/i.test(a))
        .map(a => path.join(__dirname, '..', a))
        .filter(a => fs.statSync(a).isDirectory()),
    path.join(__dirname, '../public')
].map(getVersionByTime)).then(function ([srcVersion, dstVersion]) {
    if (srcVersion > dstVersion) {
        var fullpath = path.join(__dirname, 'build-efront');
        fs.chmodSync(fullpath, 7);
        var packagepath = path.join(__dirname, "../package.json");
        var data = fs.readFileSync(packagepath).toString();
        data = JSON.parse(data);
        data.main = "public/efront.js";
        data.bin.efront = "public/efront.js";
        fs.writeFileSync(packagepath, JSON.stringify(data, null, 4));
        require("child_process").spawn(fullpath, process.argv.slice(2), {
            stdio: "inherit",
            shell: true
        });
    } else {
        console.log("已是最新版本！");
    }
}).catch(console.log);