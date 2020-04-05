var fs = require("fs");
var path = require("path");
var esprima = require("../process/esprima");
var getVariables = require("../process/compile/variables");
var typescript = require("../process/typescript");
var check = function (root) {
    var rest = [].concat.apply([], arguments);
    var map = {
        devicePixelRatio: 1,
        "screen": true,
        "window": true,
        "document": true,
        "location": true,
        "navigator": true,
        "XMLHttpRequest": true,
        "history": true,
        "Image": true,
        "Event": true,
        "self": true,
        "modules": true,
        "init": true,
        "put": true,
        "state": true
    }, needs = {};
    var list = function () {
        Object.keys(needs).filter(k => !map[k]).forEach(function (k) {
            var key = k;
            if (!global[key]) console.log(key, needs[k]);
        });
    }
    var run = function () {
        if (!rest.length) return list();
        var fullpath = rest.pop();
        fs.access(fullpath, function (error) {
            if (error) return console.error(error);
            fs.stat(fullpath, function (error, stats) {
                if (error) return console.error(error);
                if (stats.isDirectory()) {
                    fs.readdir(fullpath, function (error, names) {
                        if (error) return console.error(error);
                        rest.push.apply(rest, names.map(n => path.join(fullpath, n)));
                        run();
                    });
                    return;
                }
                if (stats.isFile()) {
                    var basename = path.relative(root, fullpath);
                    basename = basename.replace(/[\\\/]/g, '$');
                    if (/\.json$/i.test(basename)) {
                        map[basename.replace(/\.json$/i, "")] = true;
                    }
                    if (/\.(html?|xml)$/i.test(basename)) {
                        map[path.basename(basename).replace(/\.(html?|xml)$/i, "")] = true;
                    }
                    if (!/\.[jt]sx?$/i.test(fullpath)) return run();
                    map[basename.replace(/\.[jt]sx?$/i, "")] = true;
                    fs.readFile(fullpath, function (error, data) {
                        if (error) return console.error(error);
                        try {
                            var jst = esprima.parse(typescript.transpile(String(data)));
                            var {
                                unDeclaredVariables: undeclares
                            } = getVariables(jst);
                            delete undeclares[path.basename(fullpath).replace(/\.[jt]sx?$/i, '')];
                            Object.keys(undeclares).map(k => k).forEach(k => {
                                if (!needs[k]) needs[k] = [];
                                needs[k].push(basename);
                            });
                        } catch (e) {
                            console.error(basename, String(e));
                        }
                        run();
                    });
                    return;
                }
                run();
            });
        });
    }
    run();
}
check('coms/zimoli');