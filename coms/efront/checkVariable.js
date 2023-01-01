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
    var qindex = root.indexOf("?");
    if (qindex > 0) {
        root = root.slice(0, qindex);
        query = root.slice(qindex + 1);
    }
    var rest = [root];
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
        if (!globals[key]) console.line(`<red2>${key}</red2><gray>:</gray> ${needs[k].map(a => `<gray>${path.dirname(a)}/</gray><gray>${path.basename(a)}</gray>`).join("<gray>|</gray>")}`);
        else console.line(`<white>${key}</white><gray>: ${needs[k].join('|')}</gray>`);
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
            console.line(`${name} <cyan>${root}</cyan> 中没有找到外部变量`);
        } else {
            console.line(`${name} <cyan>${root}</cyan> 中共有 <white>${args.length}</white> 个外部变量`);
        }
        if (isFolder) {
            args.forEach(log);
        } else {
            console.log();
            console.line(args.map(a => {
                var c = color(a);
                var u = undeclares[a];
                return `<${c}>${a} (${u[0].row}:${u[0].col})</${c}>`;
            }).join("<gray>,</gray> "));
        }
        if (query !== undefined) {
            args = args.filter(a => query.indexOf(a) === 0 || a.indexOf(query) === 0);
            if (!args.length) {
                console.log(`\r\n没有与指定的参数${query}相关的项`);
            }
            else {
                console.log(`\r\n${query ? "与 " + query + " 相关的项" : ''}首次引用点如下：`)
                args.forEach(a => {
                    var logmap = Object.create(null);
                    for (var u of undeclares[a]) {
                        if (u.text.indexOf(a) >= 0) {
                            var c = color(a);
                            if (u.text in logmap) continue;
                            logmap[u.text] = true;
                            console.line(`<${c}>${a}</${c}>${u.text.replace(/^[^\.\[]+/, '')} ${u.row}:${u.col}`)
                        }
                    }
                })
            }
        }
    }
    var query;
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
