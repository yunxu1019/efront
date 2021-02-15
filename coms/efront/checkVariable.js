var fs = require("fs");
var path = require("path");
var esprima = require("../esprima");
var getVariables = require("../compile/variables");
var typescript = require("../typescript");
module.exports = function (root) {
    var rest = [].concat.apply([], arguments);
    var globals = {
        devicePixelRatio: 1,
        "screen": true,
        "process": true,
        "global": true,
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
        "module": true,
        "exports": true,
        "require": true,
        "__dirname": true,
        "__filename": true,
    };
    var map = {
    }, needs = {};
    var log = function (k) {
        var key = k;
        console.log();
        if (!globals[key]) console.type(`<red2>${key}</red2><gray>:</gray> ${needs[k].map(a => `<gray>${path.dirname(a)}/</gray><gray>${path.basename(a)}</gray>`).join("<gray>|</gray>")}`);
        else console.type(`<gray>${key}: ${needs[k].join('|')}</gray>`);
    };
    var list = function () {
        for (var k in needs) if (k in global) globals[k] = true;
        var args = Object.keys(needs).filter(a => !map[a]);
        args.sort((a, b) => {
            return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        });
        var isFolder = fs.statSync(root).isDirectory();
        var name = isFolder ? "路径" : "文件";
        if (!args.length) {
            console.type(`${name} <cyan>${root}</cyan> 中没有找到全局变量`);
        } else {
            console.type(`${name} <cyan>${root}</cyan> 中共有 <white>${args.length}</white> 个全局变量`);
        }
        if (isFolder) {
            args.forEach(log);
        } else {
            console.log();
            console.type(args.map(a => a in globals ? `<gray>${a}</gray>` : `<red2>${a}</red2>`).join("\r\n"));
        }
    }
    var run = function () {
        if (!rest.length) return list();
        var fullpath = rest.pop();
        if (!fs.existsSync(fullpath)) return console.error("路径不存在:", fullpath), run();
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
                basename = basename.replace(/[\\\/]/g, '$') || root;
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
                        var jst = esprima.parse(typescript.transpile(String(data).replace(/^\s*#!/, '//')));
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
    }
    run();
}
