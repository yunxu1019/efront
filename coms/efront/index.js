#!/usr/bin/env node
"use strict";
process.title = 'efront';
var path = require('path');
var fs = require("fs");
require("./console");
var loadenv = require("./loadenv");
var memery = require("./memery");
var { helps, topics } = require("../docs/helps");
var detectWithExtension = require("../reptile/detectWithExtension");
var detect = function (module_path, matchIndex = true) {
    var search_path = [];
    var joinpath = a => path.join.apply(path, a);
    var apppath = require("./mixin")(memery.PAGE_PATH, memery.PAGE).map(joinpath);
    var compath = require("./mixin")(memery.COMS_PATH, memery.COMM).map(joinpath);
    apppath.push(path.join(__dirname, '../../apps'));
    compath.push(
        path.join(__dirname, '../../'),
        path.join(__dirname, '../../coms'),
        path.join(__dirname, '../../coms/basic'),
        path.join(__dirname, '../../coms/basic_'),
    );
    if (/^[\\\/]/.test(module_path)) {
        search_path = search_path.concat(apppath, compath);
    }
    else {
        search_path = search_path.concat(compath, apppath);
    }
    search_path.unshift(
        process.cwd(),
    );
    var search_object = Object.create(null);
    search_path = search_path.filter(a => search_object[a] ? false : search_object[a] = true);
    var extensions = [".js", ".ts", "", '.jsx', '.tsx', '.vue'];
    if (matchIndex) {
        extensions.unshift("/index.js", "/index.ts", '/index.jsx', '/index.tsx');
    }
    return detectWithExtension(module_path, extensions, search_path);
};
var setenv = function (evn, cover) {
    var dist = memery;
    for (var k in evn) {
        var k1 = k.toUpperCase();
        if (cover !== false || dist[k1] === undefined) memery.set(k1, evn[k]);
    }
};
var startServer = function () {
    var fullpath = process.cwd();
    setenv({
        public_path: fullpath,
        app: "./"
    });
    require("./setupenv");
    require("../server/main");
};
var startDevelopEnv = function () {
    setAppnameAndPorts(arguments);
    require("./setupenv");
    require("./console");
    memery.islive = true;
    require("../server/main");
};
var setAppnameAndPorts = function (args) {
    var appname = memery.APP, http_port, https_port;
    for (var cx = 0, dx = args.length; cx < dx; cx++) {
        var arg = args[cx];
        if (isEmpty(arg)) continue;
        if (isFinite(arg)) {
            if (!isFinite(http_port)) http_port = arg;
            else if (!isFinite(https_port)) https_port = arg;
        } else if (typeof arg === 'string') {
            appname = arg;
        }
    }
    if (!http_port && !https_port) http_port = memery.HTTP_PORT;
    setenv({
        app: appname,
        http_port: http_port,
        https_port: https_port
    });
}

var detectEnvironment = async function (comm) {
    let fs = require("fs").promises;
    let currentpath = process.cwd(), config = {
        page_path: memery.PAGE_PATH,
        comm: memery.COMM || comm || '',
        coms_path: memery.COMS_PATH,
        app: memery.APP || '',
        page: memery.PAGE,
    };
    var names = await fs.readdir(currentpath, { withFileTypes: true });
    names = names.filter(n => n.isDirectory());
    var env_path = [];
    var coms_path = [];
    var public_path = [];
    var libs_path = [];
    var rest_path = [currentpath];
    for (var { name } of names) {
        if (/page|^app|界面|页面|应用/i.test(name)) {
            if (memery.PAGE_PATH === undefined) config.page_path = name;
        }
        else if (/^src|(^|[\_\-\s])source|^code|源|代码/i.test(name)) {
            if (memery.PAGE_PATH === undefined) config.page_path = name;
            coms_path.push(name);
        }
        else if (/(node_)?modules|lib|com|fun|depe|组件|模块|依赖|库|函数/i.test(name)) {
            if (/(node_)?modules|lib|模块|库/.test(name)) {
                libs_path.push(name);
            }
            else {
                coms_path.push(name);
            }
        }
        else if (/env|conf|环境|配置|设置/i.test(name)) {
            env_path.push(name);
        }
        else if (/d[ie]st|www|^pub|release|发布|目标|版本|输出|产品|^(?:out|output)$/i.test(name)) {
            public_path.push(name);
        }
        else {
            rest_path.push(name);
        }
    }
    if (config.page_path === undefined) try {
        var page_path = await detectWithExtension(memery.INDEX_NAME, memery.INDEX_EXTENSIONS, rest_path);
        page_path = path.dirname(page_path);
        config.page_path = path.dirname(page_path);
        config.page = path.basename(page_path);
    } catch { }
    var existsSync = require('fs').existsSync;
    var exists_envpath = (a, extt) => existsSync(path.join(currentpath, a, 'setup' + extt));
    env_path = env_path.filter(a => exists_envpath(a, '.bat') || exists_envpath(a, '.cmd') || exists_envpath(a, '.sh'));
    if (public_path.length === 1 && !process.env.PUBLIC_PATH) {
        config.public_path = public_path[0];
    }
    if (1 === env_path.length) {
        memery.ENVS_PATH = env_path[0] + "," + path.join(require("os").homedir(), '/.efront/_envs');
        var env = loadenv(path.join(env_path[0], "setup"));
        setenv(env, false);
        if (memery.PAGE_PATH !== undefined) config.page_path = memery.PAGE_PATH;
    }
    if (config.page_path === undefined) config.page_path = currentpath;

    coms_path.push(path.join(__dirname, '../../coms'));
    if (memery.COMS_PATH !== undefined) {
        if (0 > coms_path.indexOf(memery.COMS_PATH)) coms_path.unshift(memery.COMS_PATH);
    }
    if (!memery.COMM) {
        if (config.page_path !== undefined) {
            config.comm += ",zimoli";
        }
        else {
            config.comm += ",reptile";
        }
    }
    config.coms_path = coms_path.join(',');
    if (typeof memery.LIBS_PATH === 'string') {
        libs_path.unshift(memery.LIBS_PATH);
    }
    if (libs_path.length) {
        setenv({
            libs: memery.LIBS || '',
            libs_path: libs_path.join(',')
        });
    }
    setenv(config);
    if (env_path.length === 1) require('./setupenv');
};
console.setLogger('help', function (...args) {
    console.line(`<cyan>${i18n`帮助`}</cyan>`, ...args, `\r\n`);
});
var showHelpLine = function (line) {
    console.help(format(line));
}
var showHelpInfo = function (help) {
    var { info, commands } = help;
    showHelpLine(i18n`${info ? info + ", " : info}可以使用的命令语法有：`);
    commands.forEach(a => showHelpLine(`efront ${a}`));
    showTopicInfo(commands, i18n`其中`);
};
var format = s => s
    .replace(/[a-z][_a-z]*/g, "<blue2>$&</blue2>")
    .replace(/(?<![a-z])[\d]+/ig, "<green>$&</green>")
    .replace(/[A-Z][_A-Z]*/g, "<purple>$&</purple>")
    .replace(/\-+|\=+/g, "<gray>$&</gray>")
    .replace(/\|/g, "<gray>|</gray>");
var gettopic = function (w) {
    return topics[w];
};
var showTopicInfo = function (commands, prefix = '') {
    var tips = {};
    commands = [].concat(commands || '').forEach(a => a.replace(/[A-Z][_A-Z]*/g, function (w) {
        if (w in topics && !tips[w]) {
            tips[w] = gettopic(w);
        }
        return w;
    }));
    var tips1 = Object.keys(tips).map(a => ` ${a} 是${tips[a][0]}`);
    if (tips1.length > 1) return showHelpLine(prefix + tips1.join(","));
    tips1 = tips1[0];
    var tips = tips[Object.keys(tips)[0]];
    if (!tips) return;
    var msg = prefix + tips1;
    if (tips.default && !~tips.indexOf(tips.default) && tips.length > 1) tips.splice(1, 0, tips.default);
    if (tips.length > 1) msg += i18n`, 可能的取值有 ${tips.slice(1).join(", ")}`;
    if (tips.default) msg += `, 默认值是${+ tips.default}`;
    showHelpLine(msg);
};

var transform = function (readfrom, writeto, run) {
    if (!writeto) {
        return console.error(i18n`请指定输出文件名！`);
    }
    detect(readfrom).then(function (fullpath) {
        fs.readFile(fullpath, function (error, data) {
            if (error) return console.error(error);
            data = data.toString();
            var invoker = /^\s*#\!.*?[\r\n]+/.exec(data);
            if (invoker) data = data.slice(invoker[0].length);
            data = run(data);
            if (invoker) data = invoker[0] + data;
            var readpath = fullpath;
            while (!/\.[.\/]*$/.test(readfrom)) {
                readfrom = path.dirname(readfrom);
                readpath = path.dirname(readpath);
            }
            var distpath = path.join(readpath, writeto);
            if (path.extname(fullpath) && !path.extname(distpath)) {
                distpath = distpath + path.extname(fullpath)
            }
            fs.writeFile(distpath, data, function (error) {
                if (error) console.error(error);
                else console.info(i18n`处理完成：${fullpath}
            =>  ${distpath}`);
            });
        })
    }, console.error);

}
var commands = {
    pack(readfrom, writeto) {
        if (!writeto) {
            console.error(i18n`请输入目标路径！`);
            return;
        }
        require("../build/pack")(readfrom, writeto);
    },
    sign(filepath, mask) {
        var data = fs.readFileSync(filepath).toString();
        data = JSON.parse(data);
        require("../basic/crypt").sign(data, mask);
        data = JSON.stringify(data);
        fs.writeFileSync(filepath, data);
    },
    path() {
        if (arguments.length > 0) return this.detect.apply(this, arguments);
        console.line(path.join(__dirname, '../..'));
    },
    pick(readfrom, writeto, keypath) {
        transform(readfrom, writeto, function (data) {
            var scanner2 = require("../compile/scanner2");
            var washcode = require("../compile/washcode");
            var code = scanner2(data);
            var envs1 = code.envs;
            var code = washcode(code, keypath);
            var envs2 = code.envs;
            var vars = [];
            for (var v in envs2) {
                if (!envs1[v]) vars.push(v);
            }
            code.push.apply(code, scanner2(`\r\nvar ${vars.join(',')};`));
            return data.toString();
        });
    },
    wash(readfrom, writeto) {
        this.pick(readfrom, writeto, false);
    },
    format(readfrom, writeto, tabSize) {
        transform(readfrom, writeto, function (data) {
            var scanner2 = require("../compile/scanner2");
            var format = require("../compile/formatcode");
            var code = scanner2(data);
            format(code, +tabSize || 4);
            return code.toString();
        });
    },
    detect(...appnames) {
        if (!appnames.length) return this.path();
        appnames.forEach(appname => {
            detectEnvironment().then(function () {
                detect(appname).then(console.info, console.error);
            }, console.error);
        });
    },
    packexe(readfrom, writeto) {
        if (!writeto) {
            console.error(i18n`请输入目标路径！`);
            return;
        }
        require("../build/packexe")(readfrom, writeto);
    },
    unpack(readfrom, writeto) {
        require("../build/unpack")(readfrom, writeto);
    },
    async check(...args) {
        await detectEnvironment();
        args = [].concat.apply([], args);
        for (var a of args) {
            await detect(a, false).then(
                require("./checkVariable"),
                console.error
            );
        }
    },
    async find() {
        await detectEnvironment();
        var argName = arguments[0];
        var files;
        if (/[\\\/\.]/.test(argName)) {
            argName = arguments[arguments.length - 1];
            files = [].slice.call(arguments, 0, arguments.length - 1);
        }
        else {
            files = [].slice.call(arguments, 1, arguments.length);
        }
        files = [].concat.apply([], files);
        files = files.map(f => detect(f, false));
        files = await Promise.all(files);
        argName = argName.split(",");
        if (!files.length) files.push.apply(files, memery.COMS_PATH.split(","));
        var findVariable = require("./findVariable");
        await findVariable(argName, files);
    },
    version() {
        // 版本号
        console.line(
            `<blink>efront</blink> <white2>${require("../../package.json").version}</white2>`
        );
    },
    memery() {
        console.line(`${require("../basic/size")(process.resourceUsage ? process.resourceUsage().maxRSS * 1024 : process.memoryUsage().rss)}`);
    },
    kill(port) {
        this.request(port ? port + "/:quit" : "/:quit").then(console.info, console.error);
    },
    parse(address) {
        var opt = {
            method: 'options',
            host: '127.0.0.1',
            rejectUnauthorized: false,
            allowHTTP1: true,
        };
        if (address instanceof Object) {
            return Object.assign(address, Object.assign(opt, address));
        }
        if (/^\:?\d+(\/[\:\w]+)?$/.test(address)) {
            var [port, pathname] = address.split("/");
            opt.port = +port.replace(/^:/, '');
            if (pathname) opt.path = "/" + pathname;
        } else if (/^\:[\w]*$/.test(address)) {
            opt.path = "/" + address;
        } else {

            var match = parseURL(address);
            if (match) {
                var { protocol, host, port, pathname } = match;
                if (protocol) {
                    protocol = protocol.replace(/\/*$/, '');
                    switch (protocol) {
                        case "s":
                            protocol = "https:";
                            break;
                        case "":
                            protocol = "http:";
                        default:
                    }
                    opt.protocol = protocol;
                }
                if (port) opt.port = +port.replace(/^:/, '');
                if (host) opt.host = host;
                if (pathname) opt.path = pathname;

            }
        }
        return opt;
    },
    async get(url, dist) {
        if (!url) return console.error(i18n`请输入网络路径！`);
        var opt = this.parse(url);
        opt.method = 'get';
        if (!dist) dist = url.replace(/[\\\/]+$/, '').replace(/^[\s\S]*?([^\\\/]+)$/, "$1");
        if (!dist) return console.error(i18n`无法确定文件名`);
        var stream;
        await this.request(opt, function (chunk) {
            if (chunk) {
                if (!stream) stream = fs.createWriteStream(dist, { start: 0 });
                stream.write(chunk);
            }
            else {
                stream.end();
                stream.close();
            }
        });
        console.log(i18n`完成：` + dist);
    },
    request(address, quitable = false) {
        var opt = this.parse(address);
        return new Promise(function (ok, oh) {
            if (quitable) {
                var quitme = require("../efront/quitme");
                quitme(function () {
                    req.removeAllListeners();
                    req.on("error", () => { });
                    req.destroy();
                });
            }
            var response = function (res) {
                var data = [];
                var error = false;
                if (res.statusCode !== 200) {
                    error = true;
                }
                res = decodeHttpResponse(res);
                res.on("end", function () {
                    var text = Buffer.concat(data).toString();
                    if (error) {
                        oh(text || res.statusMessage);
                        if (quitme) quitme();
                        return;
                    }
                    ok(text);
                    if (isFunction(quitable)) quitable(), quitme();
                });
                res.on("data", function (chunk) {
                    if (!error && isFunction(quitable)) return quitable(chunk);
                    data.push(chunk);
                });
            };
            if (opt.protocol === 'https:') {
                var req = require("https").request(opt, response);
                req.end();
            } else {
                var req = require("http").request(opt, response);
                req.on("error", function () {
                    opt.protocol = 'https:';
                    var req = require("https").request(opt, response);
                    req.on("error", oh);
                    req.end();
                });
                req.end();
            }
        })

    },
    link(address) {
        var address = this.parse(address);
        address.path = '/:link';
        this.request(address).then(console.line.bind(console, `<cyan>${i18n`连接号`}</cyan>`));
    },
    care(address, linkid) {
        var opt = this.parse(address);
        opt.path = "/:link";
        var error = function (e) {
            console.error(e);
        };
        var commands = this;
        var run = function (res, type) {
            console.line(`<cyan>${type || i18n`消息`}</cyan>`, res, '\r\n');
            commands.request(opt, true).then(run, error);
        };

        var req = function (res) {
            opt.path = '/:care-' + res;
            run(res, i18n`连接到`);
        };
        if (linkid) {
            req(linkid);
        } else {
            this.request(opt, true).then(req, error);
        }
    },
    cast(address, linkid, msg) {
        var opt = this.parse(address);
        opt.path = `/:cast-${linkid}?${encodeURIComponent(msg)}`;
        this.request(opt);
    },
    help(value1) {
        // 帮肋信息
        if (!value1) {
            helps.sort((a, b) => a.commands[0] > b.commands[0] ? 1 : a.commands[0] < b.commands[0] ? -1 : 0);
            var length = Math.max.apply(Math, helps.map(a => a.commands[0].length));
            showHelpLine(i18n`可以使用的命令有：`);
            helps.forEach(({ info, commands, hide }) => !hide && showHelpLine(`efront ${commands[0]}${" ".repeat(length - commands[0].length)} ${info}`));
            showHelpLine(i18n`如要显示更具体的信息，请使用:${" efront help COMMAND|VARIABLES"}`)
            showTopicInfo("COMMAND|VARIABLES", `其中`);
            return;
        }
        if (value1.toLowerCase() in helps) {
            value1 = value1.toLowerCase();
            var help = helps[value1]
            showHelpInfo(help);
            return;
        }
        if (value1.toUpperCase() in topics) {
            value1 = value1.toUpperCase();
            showTopicInfo(value1);
            return;
        }
        showHelpLine(i18n`目前没有与 ${value1} 相关的帮助信息！`);
    },
    async docs() {
        setAppnameAndPorts(arguments);
        // 文档
        memery.islive = true;
        setenv({
            page_path: path.join(__dirname, '../../docs'),
            coms: 'docs,zimoli,basic,third-party',
            page: './',
            apis: 'docs,zimoli'
        });
        require("./setupenv");
        require("../server/main");
        var ported = await wait(function () { return memery.proted }, 200);
        if (ported) showHelpLine(i18n`可以通过浏览器访问打开的端口以查看文档`);
    },
    demo() {
        memery.islive = true;
        setenv({
            public_path: path.join(__dirname, "../../apps"),
            page_path: path.join(__dirname, "../../apps"),
            coms_path: path.join(__dirname, "../../coms"),
        });
        if (!memery.APP) memery.APP = gettopic("SRCNAME").default;
        setAppnameAndPorts(arguments);
        require("./setupenv");
        require("../server/main");
        showHelpLine(i18n`可以通过浏览器访问已打开的端口以查看示例项目:${memery.APP}`);
    },
    create(srcname, appname) {
        var folders = fs.readdirSync(process.cwd());
        var names = ["_envs", "coms", "apps", "pages"];
        if (folders.length === 1) {
            if (!~names.indexOf(folders[0])) {
                throw new Error(i18n`请在空目录或efront目录执行创建操作!`);
            }
        } else if (folders.length) {
            var reg = new RegExp(names.join("|"));
            if (folders.indexOf("_envs") < 0) {
                if (folders.filter(a => reg.test(a)).length < 2) {
                    throw new Error(i18n`请在空目录或efront目录执行创建操作!`);
                }
            }
        }
        detectEnvironment().then(function () {
            if (appname) {
                setenv({ app: appname });
            }
            setenv({
                envs_path: './_envs',
                coms_path: './coms',
                page_path: "./apps"
            })
            require("./setupenv");
            require("../build/create")(srcname, appname);
        });
    },
    simple(srcname, appname) {
        var create = function (distpath) {
            setenv({
                app: path.basename(distpath),
                envs_path: path.join(distpath, '_envs'),
                page_path: path.join(distpath, 'pages'),
                public_path: path.join(distpath, 'public'),
                coms_path: path.join(distpath, 'coms'),
            });
            require("./setupenv");
            require("../build/create")(srcname || 'blank', '');
        };
        if (!appname) {
            fs.readdir(process.cwd(), function (error, files) {
                if (error) throw new Error(i18n`没有权限！`);
                if (files.length > 0) {
                    if (!memery.FORCE) throw new Error(i18n`当前文件夹不为空！`);
                }
                create(process.cwd());
            });
            return;
        }
        var distpath = path.join(process.cwd(), appname);
        var exists = fs.existsSync(distpath);
        if (!exists) {
            fs.mkdirSync(distpath);
        }
        fs.readdir(distpath, function (error, files) {
            if (error) throw new Error(i18n`没有权限！`);
            if (files.length > 0) {
                throw new Error(i18n`项目文件夹已存在且不为空！`);
            }
            create(distpath);
        });
        return;
    },
    dev(appname, http_port, https_port) {
        startDevelopEnv(appname, http_port, https_port);
    },

    live(http_port, https_port) {
        detectEnvironment().then(function () {
            startDevelopEnv(memery.APP || "", http_port, https_port);
        }).catch(console.error);
    },
    cook() {
        setAppnameAndPorts(arguments);
        memery.WAITER_NUMBER = 1;
        detectEnvironment().then(function () {
            memery.PUBLIC_PATH = memery.PAGE_PATH;
            require("./setupenv");
            require("../server/main");
        })
    },
    start() {
        memery.WAITER_NUMBER = 1;
        setAppnameAndPorts(arguments);
        detectEnvironment().then(function () {
            require("./setupenv");
            require("../server/main");
        });
    },
    set(key, value) {
        setenv({ [key]: value });
    },
    setxpath(pathname, d) {
        var reg = require("./osreg");
        var regpath = reg.get("path");
        var { delimiter } = require("path");
        var pathmap = Object.create(null);
        for (var p of regpath.split(delimiter)) {
            if (p) pathmap[p] = true;
        };
        var showres = function () {
            var plist = Object.keys(pathmap);
            if (!plist.length) {
                console.info(i18n`当前用户没有可执行文件的扫描路径\r\n`);
                return;
            }
            else {
                console.info(i18n`当前可执行文件的扫描路有\r\n`);
                console.log(plist.join("\r\n"));
            }
        }
        if (!pathname) {
            return showres();
        }
        pathname = pathname.split(delimiter);
        var newmap = Object.create(null);
        for (var p of pathname) {
            var p1 = p;
            if (!/[%$~]/.test(p)) {
                if (!path.isAbsolute(p) && fs.existsSync(p)) {
                    p = path.resolve(p);
                }
                if (fs.existsSync(p)) {
                    p1 = fs.realpathSync(p);
                }
            }
            newmap[p1] = p;
        }
        for (var p in newmap) {
            for (var k in pathmap) {
                if (p === k || newmap[p] === k || !/[%$~]/.test(k) && fs.existsSync(k) && fs.realpathSync(k) === p) delete pathmap[k];
            }
        }
        if (!d) {
            var tempmap = Object.create(null);
            for (var p in newmap) tempmap[newmap[p]] = true;
            pathmap = Object.assign(tempmap, pathmap);
        }
        var value = Object.keys(pathmap).join(delimiter);
        reg.set("path", value, false);
        Promise.resolve().then(showres);
    },
    pathx(pathname) {
        this.setxpath(pathname, false);
    },
    pathxrm(pathname) {
        this.setxpath(pathname, true);
        console.log(i18n`删除成功！`);
    },
    async password() {
        await new Promise(ok => setTimeout(ok, require("../basic/isProduction") ? 0 : 360));
        require("../server/password").requestPassword();
    },
    record() {
        var fullpath = process.cwd();
        setenv({
            public_path: fullpath,
            record_path: fullpath,
            app: "./"
        });
        require("../server/main");
    },
    serv() {
        setAppnameAndPorts(arguments);
        startServer();
    },
    run(appname) {
        var args = [].concat.apply(["efront"], arguments);
        if (restArgv.length) args.push.apply(args, restArgv);
        if (!appname) {
            console.line(i18n`请输入要启动的程序!`);
            return;
        }
        var fullpath = process.cwd();
        var detectPromise = detectWithExtension(appname, ["", ".js", ".ts", "/index.js", "/index.ts"], ['']);
        memery.islive = memery.LIVEMODE !== false;
        detectPromise.catch(function () {
            detectEnvironment("reptile").then(function () {
                require("./setupenv");
                require("./run")(appname, args);
            });
        });
        detectPromise.then(function (f) {
            setenv({
                comm: './,basic,basic_',
                coms_path: './,' + path.join(__dirname, '..'),
            }, false);
            require("./setupenv");
            require('./run')(path.relative(fullpath, f), args);
        }, function () { });
    },
    async public(app_Name, module_Name, publicOnly) {
        if (app_Name) {
            if (app_Name === ".") app_Name += "/";
            if (/:[^\\\/]*$/.test(app_Name)) {
                if (!module_Name) module_Name = /\:([^\\\/]*)$/.exec(app_Name)[1];
                app_Name = app_Name.slice(0, app_Name.length - module_Name.length - 1);
            }
            memery.APP = app_Name;
        }
        var module_Name = module_Name || argv.slice(1).filter(a => /^([^\\\/\.\:]+)$/.test(a))[0];
        if (module_Name) {
            var [export_to, export_as] = module_Name.split("=");
            if (export_to) {
                memery.EXPORT_TO = export_to;
            }
            if (export_as) {
                memery.EXPORT_AS = export_as;
            }
        }
        if (!publicOnly) await detectEnvironment();
        var fullpath = process.cwd();
        var promise = detectWithExtension(memery.APP, ["", ".js", ".ts"], [fullpath]);
        promise.catch(function () {
            require('../build');
        });
        promise.then(function (f) {
            var isdir = fs.statSync(f).isDirectory();
            var app = path.relative(fullpath, f);
            if (isdir) {
                setenv({
                    app: memery.APP,
                    comm: (app && !/[^\.\\\/]+/.test(app) ? app + ',zimoli,' : `zimoli,`)
                });
                require("../build");
            } else {
                setenv({
                    app,
                    public_name: path.basename(f).replace(/\.(\w+)$/, ''),
                }, false);
                require("./setupenv");
                require('../build');
            }
        }, function () { });
    },
    watch() {
        setAppnameAndPorts(arguments);
        memery.ENCRYPT = false;
        memery.islive = true;
        detectEnvironment().then(function () {
            require("../build/watch-index");
        });
    },
    ip() {
        var ip = require("./getLocalIP")();
        showHelpLine(ip);
        var iplist = [];
        var listener = function (res) {
            var buff = [];
            res.on('data', function (a) {
                buff.push(a);
            });
            res.on("end", function (a) {
                var a = Buffer.concat(buff).toString();
                if (a && !~iplist.indexOf(a)) {
                    iplist.push(a);
                    showHelpLine(a);
                }
            });
            res.on("abort", console.error);
        };
        var warn = function () {
            console.warn(i18n`确认公网 IP 时存在异常！`);
        };
        require("http").get("http://ipv4.efront.cc/ip.jsp", listener).on('error', warn);
        require("http").get("http://us.efront.cc/ip.jsp", listener).on('error', warn);
        require("http").get("http://ipv6.efront.cc/ip.jsp", listener).on('error', warn);
    }
};
helps.forEach(function (help) {
    var { commands: _commands } = help;
    _commands.forEach(cmd => {
        var key = cmd.replace(/(\-+)?[A-Z\_]([\=A-Z\|\_]*)/g, "").trim();
        if (!/\s/.test(key)) {
            key.split(/\|/).forEach(k => {
                if (k in commands) {
                    if (help.key) {
                        if (help.key === k) return;
                        if (!(help.key instanceof Array)) {
                            help.key = [help.key];
                        }
                        help.key.push(k);
                    } else {
                        help.key = k;
                    }
                }
                helps[k] = help;
            });
        }
    });
});
topics.COMMAND.push(Object.keys(helps).filter(k => /^[a-z]+$/.test(k)));
var run = function (type, value1, value2, value3) {
    if (type) type = type.toLowerCase();
    if (!type) {
        commands.serv(80);
        return;
    }
    if (type.toLowerCase() in helps) {
        type = type.toLowerCase();
        var { help, create, public: build, run, simple } = commands;
        switch (type) {
            case "setenv":
            case "set":
                if (!isEmpty(value1)) commands.set(value1, value2);
                require("../server/userdata").setItem("memery", require("../basic/serialize")(memery.all()));
                break;
            case "env":
            case "listenv":
                var mm = memery.all();
                var km = Object.keys(mm);
                if (!km.length) {
                    console.info(i18n`没有自定义的环境变量\r\n`);
                }
                else {
                    console.info(i18n`已设置如下 ${km.length} 个环境变量：\r\n\r\n`);
                    for (var k in mm) {
                        console.line("  ", `<green2>${k}</green2>`, "= ");
                        console.log(mm[k]);
                    }
                    console.log();
                    console.log();
                }
                console.info(i18n`未修改过的默认变量如下：\r\n\r\n`);
                var md = false;
                for (var k in memery.defaults) {
                    if (k in mm) continue;
                    md = true;
                    mm[k] = true;
                    console.line("  ", `<white>${k}</white>`, "= ");
                    console.log(memery.defaults[k]);
                }
                if (md) console.log(), console.log();
                md = false;
                for (var k in memery) {
                    if (k in mm) continue;
                    if (k.toUpperCase() !== k || k === 'EFRONT' || isEmpty(memery[k])) continue;
                    if (!md) {
                        md = true;
                        console.info(i18n`其他环境变量如下：\r\n\r\n`)
                    }
                    console.line("  ", `<gray>${k}</gray>`, "= ");
                    console.log(memery[k]);
                }
                break;
            case "from":
                if (value2 && !/^(init)$/i.test(value2)) {
                    if (!value3) {
                        help('from');
                        break;
                    }
                }
                if (!value1) {
                    help('from');
                    break;
                }
                create(value1, value3);
                break;
            case "init":
                if (value2 && value2.toLowerCase() !== "from") {
                    help("init");
                    break;
                }
                if (value2 && !value3) {
                    help('init');
                    break;
                }
                create(value3 || 'blank', value1);
                break;
            case "blank":
                create("blank", value1);
                break;
            case "create":
            case "simple":
                if (value3) {
                    if (!/^from$/i.test(value2)) {
                        help("simple");
                        break;
                    }
                    simple(value3, value1);
                    break;
                }
                if (value2) {
                    if (!/^from$/i.test(value1)) {
                        help("simple");
                        break;
                    }
                    simple(value2, '');
                    break;
                }
                simple('blank', value1);
                break;
            case "publish":
            case "release":
                memery.RELEASE = 1;
            case "public":
                var publicOnly = true;
            case "build":
                build(value1, value2, publicOnly);
                break;

            case "run":
                run.apply(null, argv.slice(1));
                break;
            case "cooks":
            case "https":
            case "lives":
            case "devs":
            case "tests":
            case "starts":
                if (value2) {
                    [value2 = memery.HTTPS_PORT, value1 = 0] = [value1, value2];
                } else if (value1) {
                    value2 = value1;
                    value1 = 0;
                } else {
                    value2 = memery.HTTPS_PORT;
                    value1 = 0;
                }
                argv = [type, value1, value2];
            default:
                type = helps[type].key;
                if (type instanceof Array) {
                    help(type[0]);
                } else {
                    if (/^(live|cook)$/.test(type)) {
                        if (!argv[1] && !argv[2]) argv[1] = memery.HTTP_PORT, argv[2] = 0;
                    }
                    commands[type].apply(commands, argv.slice(1));
                }
        }

    } else if (/^\d+$/.test(type)) {
        commands.serv(type, value1);
    } else {
        var isRun = /[\/\$\\]|_test$|\.[cm]?[jt]sx?$/i.test(type);
        if (isRun) {
            commands.run.apply(commands, argv);
        } else {
            console.warn(i18n`不支持该命令<red2> ${type} </red2>`);
            var cmds = search(type, Object.keys(helps).filter(k => !/^\d/.test(k)).map(k => ({ key: k })), "key");
            if (cmds.length) {
                console.line(i18n` 如下命令与您输入的命令相似：\r\n`);
                var tagLength = 0;
                var matched = [];
                for (var c of cmds) {
                    var key = (c.__proto__ ? c.__proto__ : Object.getPrototypeOf(c)).key;
                    var h = helps[key];
                    if (matched.indexOf(h) < 0) {
                        matched.push(h);
                        h.matches = [];
                        h.matched = [];
                    }
                    h.matches.push(key);
                    h.matched.push(c.key);
                }
                for (var c of matched) {
                    c.matches = c.matches.join(", ");
                    c.matched = c.matched.join("<gray>,</gray> ");
                    tagLength = Math.max(c.matches.length, tagLength);
                }
                tagLength += 2;
                for (var c of matched) {
                    console.line("   <cyan2>" + c.matched.replace(/\<(\/?)b\>/g, `<$1yellow2>`) + "</cyan2>", "<gray>" + new Array(tagLength - c.matches.length).join("-") + "</gray> " + c.info);
                }
            }
        }
    }
};
var __exit = process.exit;
var quit = function (e) {
    if (quit.name === 'quit') {
        console.begin("red2");
        console.line(i18n` 错误 `);
        console.log(e);
        console.end();
    } else {
        console.error(e);
        console.line(i18n`异常退出`);
    }

    __exit.call(process, 1);
};
process.on("exit", function () {
    if (!/win32/.test(process.platform)) {
        console.log();
    }
});
var argv = [];
var restArgv = [];
var userdata = require("../server/userdata");
userdata.getItem("memery").then(async function (mm) {
    setenv(require("../basic/parseKV")(mm));
    var 授权列表 = await userdata.授权列表;
    memery.炸毛 = function (a) {
        return function () {
            return a;
        };
    }(授权列表);
    restArgv = [];
    var cmd = false;
    var script = null;
    var efront = null;
    argv = (process._argv || process.argv).slice(1).map(a => a.replace(/^[^\s]+\r\n|[\s\r\n]+$/g, '')).filter((a, i) => {
        if (cmd === true) return true;
        if (a in helps) return cmd = a;
        if (!/^--/.test(a)) {
            if (!efront) return efront = a;
            if (!script) return script = a;
            if (!cmd) return cmd = true;
            return true;
        }
        if (/^--(?:inspect|debug)(-brk)?(\=\d*)?$/.test(a)) {
            restArgv.push(a);
            return;
        }
        restArgv.push(a);
        a = a.replace(/^--/, '');
        var key, value = '';
        if (/^(no|off|not|is-not|disable)-/.test(a)) {
            value = false;
        }
        if (/^(on|yes|is(?!-not)|enable)-/.test(a)) {
            value = true;
        }
        a = a.replace(/^(no|on|yes|off|is-not|is|enable|disable)-/, '');
        if (/=/.test(a)) {
            [key, value] = a.split("=");
        } else {
            key = a;
            if (value !== false) value = true;
        }
        key = key.replace(/\-/g, '_');
        commands.set(key, value);
    }).slice(1);
    var [type, value1, value2, value3] = argv;
    run(type, value1, value2, value3);
});