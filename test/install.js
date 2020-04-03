var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
var root_path = path.dirname(__dirname);
function pack() {
    child_process.execSync("npm pack", { cwd: root_path, stdio: "inherit" });
}
function getLastVersion() {

    var names = fs.readdirSync(root_path);
    var packages = names.filter(a => /[\d\.]+\.tgz$/i.test(a));
    packages = packages.map(a => {
        return {
            name: a,
            path: path.join(root_path, a),
            version: /([\d\.]+)\.tgz$/i.exec(a)[1].split('.')
        };
    });
    packages.sort((a, b) => {
        var { version: version1 } = a;
        var { version: version2 } = b;
        var length = Math.min(version1.length, version2.length);
        for (var cx = 0; cx < length; cx++) {
            if (version1[cx] !== version2[cx]) return version2[cx] - version1[cx];
        }
        return version2.length - version1.length;
    });
    return packages[0];
}
function install(fullpath) {
    child_process.execSync("npm install -g " + fullpath, { stdio: "inherit" });
}
pack();
var packed = getLastVersion();
install(packed.path);