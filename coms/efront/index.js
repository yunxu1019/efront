#!/usr/bin/env node
"use strict";
var cluster = require("cluster");
var path = require('path');
var fs = require("fs");
require("./console");
var loadenv = require("./loadenv");
var detectWithExtension = require("../basic/detectWithExtension");
var setenv = function (evn) {
    var dist = process.env;
    for (var k in evn) {
        var k1 = k.toUpperCase();
        dist[k1] = evn[k];
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
    process.env.IN_TEST_MODE = true;
    require("../server/main");
};
var setAppnameAndPorts = function (args) {
    var appname = process.env.APP, http_port = '', https_port;
    for (var cx = 0, dx = args.length; cx < dx; cx++) {
        var arg = args[cx];
        if (!arg) continue;
        if (isFinite(arg)) {
            if (!http_port) http_port = arg;
            else if (!https_port) https_port = arg;
        } else if (typeof arg === 'string') {
            appname = arg;
        }
    }
    setenv({
        app: appname,
        http_port: +http_port >= 0 ? http_port || 80 : '',
        https_port: +https_port >= 0 ? https_port || 443 : ''
    });
}
var detectEnvironment = function () {
    let fs = require("fs");
    let currentpath = process.cwd(), config = {
        page_path: currentpath,
        comm: "",
        coms_path: '',
        app: process.env.APP || '',
        page: '',
    };
    var env_path = [];
    return new Promise(function (ok) {
        fs.readdir(currentpath, function (error, names) {
            if (error) return console.error(error);
            var coms_path = [];
            var public_path = [];
            names.filter(function (name) {
                if (/^[\.]/i.test(name)) return;
                try {
                    return fs.statSync(name).isDirectory();
                } catch (e) {
                    console.error(e);
                }
            }).forEach(function (name) {
                if (/page|app|界面|页面|应用|系统/i.test(name)) {
                    // 高屋|瓴|楼|台|宫|阁|殿|庙|堂|会|场|司|衙|门|党|帮|派|族|山|庄|寺|教|家|城|店|军|队|团|师|营|苟
                    config.page_path = name;
                } else if (/src|source|code|源|代码/i.test(name)) {
                    config.page_path = name;
                    coms_path.push(name);
                } else if (/lib|com|fun|dep|组件|模块|依赖|库|函数/i.test(name)) {
                    // 卡木|设施|员|工|匠|子|弟|臣|下|客|器|械|备|库|房|土|基|石|砖
                    coms_path.push(name);
                } else if (/env|conf|环境|配置|设置/i.test(name)) {
                    env_path.push(name);
                } else if (/d[ie]st|www|pub|release|发布|目标|版本|输出|产品|^(?:out|output)$/i.test(name)) {
                    // 梦|思想|籍|书|法|规|外|景
                    public_path.push(name);
                }
            });
            coms_path.push(':');
            if (fs.existsSync(path.join(config.page_path, 'index.html'))) {
                config.comm += ",zimoli";
            }
            config.coms_path = coms_path.join(',');
            var exists_envpath = (a, extt) => fs.existsSync(path.join(currentpath, a, 'setup' + extt));
            env_path = env_path.filter(a => exists_envpath(a, '.bat') || exists_envpath(a, '.cmd') || exists_envpath(a, '.sh'));
            if (public_path.length === 1) {
                config.public_path = public_path[0];
            }
            if (1 !== env_path.length) {
                setenv(config);
            } else {
                process.env.envs_path = env_path[0] + "," + path.join(require("os").homedir(), '/.efront/_envs');
                var env = loadenv(path.join(process.env.envs_path, "setup"));
                setenv(config);
                setenv(env);
                require("./setupenv");
            }
            ok();
        });
    });
};
var showHelpLine = function (line) {
    if (cluster.isMaster) console.type('<cyan>帮助</cyan>', `${format(line)}\r\n`);
}
var showHelpInfo = function (help) {
    var { info, commands } = help;
    showHelpLine(`${info ? info + ", " : info}可以使用的命令语法有：`);
    commands.forEach(a => showHelpLine(`efront ${a}`));
    showTopicInfo(commands, '其中');
};
var format = s => s
    .replace(/[a-z][_a-z]*/g, "<blue2>$&</blue2>")
    .replace(/(?<=\W)\d+/g, "<green>$&</green>")
    .replace(/[A-Z][_A-Z]*/g, "<purple>$&</purple>")
    .replace(/\-+/g, "<gray>$&</gray>")
    .replace(/\|/g, "<gray>|</gray>");
var showTopicInfo = function (commands, prefix = '') {
    var tips = {};
    commands = [].concat(commands || '').forEach(a => a.replace(/[A-Z][_A-Z]*/g, function (w) {
        if (w in topics && !tips[w]) {
            var t = tips[w] = topics[w].split(',');
            if (/\|/.test(t[0])) t.default = t[0].replace(/^[\s\S]*?\|([\s\S]*)$/, "$1");
            t[0] = t[0].replace(/\|[\s\S]*$/, '');
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
    if (tips.length > 1) msg += ", 可能的取值有 " + tips.slice(1).join(", ");
    if (tips.default) msg += ", 默认值是" + tips.default;
    showHelpLine(msg);
};
var helps = [
    "显示版本号,version,-v,--version",
    "显示帮助信息,help,-h,--help,help COMMAND,-h COMMAND,--help COMMAND",
    "启动文档服务器,docs",
    "启动示例项目服务器,demo,demo APPNAME",
    "创建应用，项目目录允许创建第二个应用,init,from SRCNAME,init APPNAME,init APPNAME from SRCNAME,from SRCNAME init APPNAME",
    "创建简单应用，独占项目目录的单应用,create,simple,create|simple from SRCNAME,create|simple APPNAME,create|simple APPNAME from APPNAME",
    "创建空应用,blank,simple,from blank,simple from blank",
    "自动识别环境并启动开发环境服务器,live,lives,live HTTP_PORT,live HTTP_PORT HTTPS_PORT,lives HTTPS_PORT,lives HTTPS_PORT HTTP_PORT",
    "在项目文件夹启动生产环境服务器,start,starts,start HTTP_PORT,start HTTP_PORT HTTPS_PORT,starts HTTPS_PORT,starts HTTPS_PORT HTTP_PORT",
    "在项目文件夹启动开发环境服务器,dev,devs,test,dev|test HTTP_PORT,dev|test HTTP_PORT HTTPS_PORT,devs|tests HTTPS_PORT,devs|tests HTTPS_PORT HTTP_PORT",
    "在当前文件夹启动服务器,server,serve|serv|http HTTP_PORT HTTPS_PORT,serve|serv|http HTTP_PORT,https HTTPS_PORT HTTP_PORT,https HTTPS_PORT,HTTP_PORT HTTPS_PORT,HTTP_PORT,",
    "编译项目,public,publish,build,release",
    "监测文件变化，自动编译更新的部分并输出到指定目录,watch"
];
helps.forEach((str, cx) => {
    var [info, ...commands] = str.split(",");
    var help = { info, commands: commands, cmds: commands };
    helps[cx] = help;
    commands.forEach(cmd => {
        var key = cmd.replace(/[A-Z]+/g, "").trim();
        if (!/\s/.test(key)) {
            key.split(/\|/).forEach(k => helps[k] = help);
        }
    });
});
var topics = {
    COMMAND: "命令名," + Object.keys(helps).filter(k => /^[a-z]+$/.test(k)),
    APPNAME: "您的应用名",
    SRCNAME: "源项目|blank,blank,kugou,zimoli",
    HTTP_PORT: " http 端口|80",
    HTTPS_PORT: " https 端口|443",
    VARIABLES: "变量名",
};
topics.VARIABLES += "," + Object.keys(topics);

var commands = {
    version() {
        // 版本号
        console.type(
            `efront <white2>${require("../../package.json").version}</white2>`
        );
    },
    help(value1) {
        // 帮肋信息
        if (!value1) {
            var length = Math.max.apply(Math, helps.map(a => a.commands[0].length));
            showHelpLine('可以使用的命令有：');
            helps.forEach(({ info, commands }) => showHelpLine(`efront ${commands[0]}${" ".repeat(length - commands[0].length)} ${info}`));
            showHelpLine("如要显示更具体的信息，请使用: efront help COMMAND|VARIABLES")
            showTopicInfo("COMMAND|VARIABLES", '其中');
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
        showHelpLine(`目前没有与 ${value1} 相关的帮助信息！`);
    },
    docs() {
        // 文档
        setenv({
            public_path: path.join(__dirname, "../../docs"),
            coms_path: path.join(__dirname, "../../coms"),
            page_path: path.join(__dirname, '../../docs'),
            IN_TEST_MODE: true,
            comm: 'docs,zimoli',
            page: './',
            app: "docs"
        });
        setAppnameAndPorts(80);
        require("./setupenv");
        require("../server/main");
        showHelpLine('可以通过浏览器访问打开的端口以查看文档');
    },
    demo(appname = 'kugou') {
        setenv({
            public_path: path.join(__dirname, "../../apps"),
            page_path: path.join(__dirname, "../../apps"),
            coms_path: path.join(__dirname, "../../coms"),
            IN_TEST_MODE: true,
            app: appname
        });
        setAppnameAndPorts(80);
        require("./setupenv");
        require("../server/main");
        showHelpLine(`可以通过浏览器访问已打开的端口以查看示例项目:${appname}`);
    },
    create(srcname, appname) {
        var folders = fs.readdirSync(process.cwd());
        var names = ["_envs", "coms", "apps", "pages"];
        if (folders.length === 1) {
            if (!~names.indexOf(folders[0])) {
                throw new Error("请在空目录或efront目录执行创建操作!");
            }
        } else if (folders.length) {
            var reg = new RegExp(names.join("|"));
            if (folders.indexOf("_envs") < 0) {
                if (folders.filter(a => reg.test(a)).length < 2) {
                    throw new Error("请在空目录或efront目录执行创建操作!");
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
            require("../../tools/create")(srcname, appname);
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
            require("../../tools/create")(srcname || 'blank', '');
        };
        if (!appname) {
            fs.readdir(process.cwd(), function (error, files) {
                if (error) throw new Error("没有权限！");
                if (files.length > 0) {
                    throw new Error("当前文件夹不为空！");
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
            if (error) throw new Error("没有权限！");
            if (files.length > 0) {
                throw new Error("项目文件夹已存在且不为空！");
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
            startDevelopEnv(process.env.APP || "", http_port, https_port);
        }).catch(console.error);
    },
    start() {
        setAppnameAndPorts(arguments);
        require("./setupenv");
        require("../server/main");
    },
    set(key, value) {
        setenv({ [key]: value });
    },
    password() {
        require("./password").requestPassword();
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
    serv(http_port, https_port) {
        setenv({ https_port, http_port });
        startServer();
    },
    run(appname) {
        var args = [].concat.apply(["efront"], arguments);
        args.push("--efront");
        if (!appname) {
            console.info("请输入要启动的程序!");
            return;
        }
        var fullpath = process.cwd();
        var detectPromise = detectWithExtension(appname, ["", ".js", ".ts", "/index.js", "/index.ts"], [fullpath]);

        detectPromise.catch(function () {
            detectEnvironment().then(function () {
                setenv({
                    IN_TEST_MODE: true
                });
                require("./setupenv");
                require("./run")(appname, args);
            });
        });
        detectPromise.then(function (f) {
            setenv({
                app: path.relative(fullpath, f),
                comm: './,typescript-helpers',
                coms_path: './,' + path.join(__dirname, '..'),
                IN_TEST_MODE: true,
            });
            require("./setupenv");
            require('./run')(appname, args);
        }, function () { });
    },
    public(app_Name, module_Name) {
        if (app_Name && !module_Name) {
            if (/:[^\\\/]*$/.test(app_Name)) {
                module_Name = /\:([^\\\/]*)$/.exec(app_Name)[1];
                app_Name = app_Name.slice(0, app_Name.length - module_Name.length - 1);
            }
            process.env.APP = app_Name;
        }
        var module_Name = module_Name || argv.slice(3).filter(a => /^([^\\\/\.\:]+)$/.test(a))[0];
        if (module_Name) {
            var [export_to, export_as] = module_Name.split("=");
            if (export_as === undefined) {
                if (!/exports|return$/.test(export_to)) export_as = export_to;
            }
            if (export_to) {
                process.env.EXPORT_TO = export_to;
            }
            if (export_as) {
                process.env.EXPORT_AS = export_as;
            }
        }
        require("../build");
    },
    watch() {
        require("../../tools/watch");
    }
};
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
                process.env.RELEASE = 1;
            case "public":
                var publicOnly = true;
            case "build":
                if (!publicOnly) {
                    detectEnvironment().then(function () {
                        build(value1, value2);
                    });
                } else {
                    build(value1, value2);
                }
                break;

            case "run":
                run.apply(null, argv.slice(3));
                break;
            case "https":
            case "lives":
            case "devs":
            case "tests":
            case "starts":
                if (value2) {
                    [value2 = 443, value1] = [value1, value2];
                } else if (value1) {
                    value2 = value1;
                    value1 = '-1';
                } else {
                    value2 = 443;
                    value1 = '-1';
                }
            default:
                type = helps[type].cmds[0];
                commands[type](value1, value2, value3);
        }

    } else if (/^\d+$/.test(type)) {
        commands.serv(type, value1);
    } else {
        var isRun = /[\/\$\\]|_test$|\.[tj]sx?$/i.test(type);
        if (isRun) {
            commands.run.apply(commands, argv.slice(2));
        } else {
            console.info(`不支持该命令<red2> ${type} </red2>`);
        }
    }
};
var __exit = process.exit;
var quit = function (e) {
    var isDevelop = require("./isDevelop");
    if (isDevelop) {
        console.begin("red2");
        console.type(" 错误 ");
        console.log(e);
    } else {
        console.error(e);
        console.log("异常退出");
    }
    console.end();
    __exit.call(process, 1);
};
process.on("uncaughtException", quit);
process.on("unhandledRejection", quit);
process.on("exit", function () {
    if (cluster.isMaster && !/win32/.test(process.platform)) {
        console.log();
    }
});
var argv = process.argv.slice(2).filter(a => {
    if (a in helps) return true;
    if (!/^--/.test(a)) return true;
    a = a.replace(/^--/, '');
    var key, value = '';
    if (/^(no|off|not|is-not)-/.test(a)) {
        value = false;
    }
    if (/^(on|yes|is(?!-not))-/.test(a)) {
        value = true;
    }
    a = a.replace(/^(no|on|yes|off|is-not|is)-/, '');
    if (/=/.test(a)) {
        [key, value] = a.split("=");
    } else {
        key = a;
        if (value !== false) value = true;
    }
    key = key.replace(/\-/g, '_');
    commands.set(key, value);
    return false;
});
var [type, value1, value2, value3] = argv;
run(type, value1, value2, value3);