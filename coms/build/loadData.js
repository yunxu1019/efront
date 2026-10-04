var path = require('path');
var fs = require("fs").promises;

var memery = require("../efront/memery");
var { rest_coms } = require("./environment");
var sortUrl = (a, b) => {
    if (a.url > b.url) return 1;
    if (a.url < b.url) return -1;
    return 0
};
async function loadData(pages_root, POLYFILL, responseTree) {
    await patchBuilder.load();
    build.reset();
    var roots = [].concat(pages_root || [])
    roots = await getBuildRoot(roots);
    roots.sort(sortUrl).forEach(patchBuilder);
    if (rest_coms) {
        var rest = [].concat(rest_coms);
        var finded = Object.create(null);
        while (rest.length) {
            // 只处理一级
            var [p, n] = rest.pop();
            var files = await fs.readdir(path.join(p, n), { withFileTypes: true });
            for (var f of files) {
                if (/^[#\.]|\_test\.[^\.\/\\]*$/.test(f.name)) continue;
                if (f.isDirectory()) {
                    rest.push([p, path.join(n, f.name)]);
                }
                else {
                    if (!/\.([cm]?jsx?|xht|tsx?|vue)$/i.test(f.name)) continue;
                    var name = path.join(n, f.name).replace(/[\\\/]/g, '$').replace(/\.[^\.\/]+$/, '');
                    if (name in finded) continue;
                    finded[name] = true;
                    roots.push(name);
                }
            }
        }
    }
    var loaded = Object.create(null);
    roots = await build(roots, responseTree, loaded);
    var index = getWebIndex(responseTree);
    if (index) {
        var [htmldata, isZimoliDetected, poweredByComment] = checkIndex(index.data);
        htmldata = Buffer.from(htmldata);
        htmldata.iswebindex = true;
        htmldata.isZimoliDetected = isZimoliDetected;
        htmldata.poweredByComment = poweredByComment;
        if (isZimoliDetected) {
            var polyfills = [
                path.join(__dirname, "../", "zimoli/main.js"),
                path.join(__dirname, "../", "zimoli/zimoli.js")
            ];
            if (POLYFILL) {
                polyfills.push(
                    path.join(__dirname, "../", "basic_/Promise.js"),
                    path.join(__dirname, "../", "basic_/[]map.js")
                )
            }
            polyfills = await getBuildRoot(polyfills);
            roots.push.apply(roots, polyfills);
        }
    }
    if (memery.EMIT) while (roots.length) {
        roots.sort(sortUrl).forEach(patchBuilder);
        roots = await build(roots, responseTree, loaded);
    }
    return responseTree;
}

module.exports = loadData;