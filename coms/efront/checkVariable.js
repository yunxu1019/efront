var mixin = require("./mixin");
var fs = require("fs");
var path = require("path");
var env = require("./setupenv")();
var joinpath = ([a, b]) => path.resolve(path.join(a || '', b || ''));
var comms_root = mixin(env.COMS_PATH, env.COMM).map(joinpath).filter(fs.existsSync);
var comms_root_length = comms_root.length;
var buildinpath = path.join(__dirname, '..');
comms_root = comms_root.filter(a => path.resolve(a) !== buildinpath);
if (comms_root.length < comms_root_length) comms_root.push(buildinpath);
// var find1 = function (data) {
//     var getVariables = require("../compile/variables");
//     var typescript = require("../typescript");
//     data = typescript.transpile(data);
//     var esprima = require("../esprima");
//     var jst = esprima.parse(data);
//     var {
//         unDeclaredVariables: undeclares
//     } = getVariables(jst);
//     return undeclares;
// };
var find = function (data) {
    return require("../compile/scanner2")(data).getUndecleared();
};
var globals = require("./globals");
module.exports = function (root) {
    var rest = [].concat.apply([], arguments);
    var map = {
    }, needs = {};
    var undeclares;
    var founded = {};
    var filesCount = 0;
    var findx = comms_root.map(a => {
        return new Promise(function (ok) {
            fs.readdir(a, function (e, names) {
                if (e) return;
                names.forEach(function (c) {
                    founded[c.replace(/\.\w+$/i, '').replace(/\-(\w)/g, (_, a) => a.toUpperCase())] = true;
                });
                ok();
            });
        })
    });
    var log = function (k) {
        var key = k;
        console.log();
        if (!globals[key]) console.type(`<red2>${key}</red2><gray>:</gray> ${needs[k].map(a => `<gray>${path.dirname(a)}/</gray><gray>${path.basename(a)}</gray>`).join("<gray>|</gray>")}`);
        else console.type(`<white>${key}</white><gray>: ${needs[k].join('|')}</gray>`);
    };
    var color = function (a) {
        if (a in founded) {
            return 'white'
        }
        if (a in globals) {
            return globals[a].name;
        }
        return 'red2'
    }
    var list = function () {
        for (var k in needs && !(k in globals)) if (k in global) globals[k] = true;
        var args = Object.keys(needs).filter(a => !map[a]);
        args.sort((a, b) => {
            return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        });
        if (filesCount === 1) args.sort((a, b) => {
            a = undeclares[a][0];
            b = undeclares[b][0];
            if (a.row !== b.row) return a.row - b.row;
            if (a.col !== b.col) return a.col - b.col;
            return 0;
        });
        var isFolder = fs.statSync(root).isDirectory();
        var name = isFolder ? "路径" : "文件";
        if (!args.length) {
            console.type(`${name} <cyan>${root}</cyan> 中没有找到外部变量`);
        } else {
            console.type(`${name} <cyan>${root}</cyan> 中共有 <white>${args.length}</white> 个外部变量`);
        }
        if (isFolder) {
            args.forEach(log);
        } else {
            console.log();
            console.type(args.map(a => {
                var c = color(a);
                var u = undeclares[a];
                return `<${c}>${a} (${u[0].row}:${u[0].col})</${c}>`;
            }).join("<gray>,</gray> "));
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
                if (!/\.[cm]?[jt]sx?$/i.test(fullpath)) return run();
                map[basename.replace(/\.[cm]?[jt]sx?$/i, "")] = true;
                fs.readFile(fullpath, function (error, data) {
                    if (error) return console.error(error);
                    try {
                        data = String(data).replace(/^\s*#!/, '//');
                        undeclares = find(data);
                        delete undeclares[path.basename(fullpath).replace(/\.[cm]?[jt]sx?$/i, '')];
                        Object.keys(undeclares).map(k => k).forEach(k => {
                            if (!needs[k]) needs[k] = [];
                            needs[k].push(basename);
                        });
                        filesCount++;
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
    Promise.all(findx).then(run);
}
