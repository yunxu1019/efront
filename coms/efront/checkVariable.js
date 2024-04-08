var mixin = require("./mixin");
var fs = require("fs");
var path = require("path");
var env = require("./setupenv")();
var fsp = fs.promises;
var { createString, SCOPED, QUOTED } = require("../compile/common");
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
module.exports = async function (root) {
    var qindex = root.indexOf("?");
    if (qindex > 0) {
        query = root.slice(qindex + 1);
        root = root.slice(0, qindex);
    }
    var map = {
    }, needs = {};
    var undeclares;
    var founded = {};
    for (var a of comms_root) try {
        var names = await fsp.readdir(a);
        names.forEach(function (c) {
            founded[c.replace(/\.\w+$/i, '').replace(/\-(\w)/g, (_, a) => a.toUpperCase())] = true;
        });
    } catch { }
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
        var name = isFolder ? i18n`路径` : i18n`文件`;
        var cyan = console.format(`<cyan>;</cyan>`).split(';');
        var white = console.format(`<white>;</white>`).split(';');
        if (!args.length) {
            console.line(i18n`${name} ${cyan.join(root)} 中没有找到外部变量`);
        } else {
            console.line(i18n`${name} ${cyan.join(root)} 中共有 ${white.join(args.length)} 个外部变量`);
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

        if (isHandled(query)) {
            args = args.filter(a => query.indexOf(a) === 0 || a.indexOf(query) === 0);
            if (!args.length) {
                console.line(i18n`\r\n没有与指定的参数${wrapcolor(query)}相关的项`);
            }
            else {
                var wrapcolor = a => {
                    var c = color(a);
                    return `<${c}>${a}</${c}>`;
                }
                if (query === 'require' && required && required.length > 0) {
                    console.line(i18n`\r\n${name}中，由${wrapcolor(query)}引用了如下${required.length}个路径:`);
                    console.line(required.map((c, i) => `${strings.decode(c)}`).join('\r\n'));
                }
                console.line(i18n`\r\n${query ? i18n`与${wrapcolor(query)}相关的项` : ''}首次引用点如下：`)
                args.forEach(a => {
                    var logmap = Object.create(null);
                    for (var u of undeclares[a]) {
                        if (u.text.indexOf(a) >= 0) {
                            if (u.text in logmap) continue;
                            logmap[u.text] = true;
                            console.line(`${wrapcolor(a)}${u.text.replace(/^[^\.\[]+/, '')} ${u.row}:${u.col}`)
                        }
                    }
                })
            }
        }
    }
    var query;
    var required = null;
    var filesCount = 0;

    await checkPath(root, function (data, fullpath) {
        var basename = path.relative(root, fullpath);
        basename = basename.replace(/[\\\/]/g, '$') || root;
        if (/\.json$/i.test(basename)) {
            map[basename.replace(/\.json$/i, "")] = true;
        }
        if (/\.(html?|xml)$/i.test(basename)) {
            map[path.basename(basename).replace(/\.(html?|xml)$/i, "")] = true;
        }
        if (!/\.[cm]?[jt]sx?$/i.test(fullpath)) return;
        map[basename.replace(/\.[cm]?[jt]sx?$/i, "")] = true;
        undeclares = find(data);
        Object.keys(undeclares).map(k => k).forEach(k => {
            if (!needs[k]) needs[k] = [];

            needs[k].push(basename);
            if (total === 1) if (k === 'require') required = undeclares[k].map(a => {
                if (a.text !== 'require') return;
                a = a.next;
                if (a.type !== SCOPED) return;
                a = a.first;
                if (a.type !== QUOTED) return;
                if (a.first !== a.last) return;
                return createString([a]);
            }).filter(a => !!a);
        });

    });
    list();
}
