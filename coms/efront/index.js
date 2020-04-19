#!/usr/bin/env node
var path = require('path');
var fs = require("fs");
require("./console");
var cluster = require("cluster");
var detectWithExtension = require("../basic/detectWithExtension");
var setenv = function (evn) {
    Object.assign(process.env, evn);
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
var startDevelopEnv = function (appname) {
    if (appname) setenv({
        app: appname
    });

    require("./setupenv");
    require("./console");
    process.env.IN_TEST_MODE = true;
    require("../server/main");
};
var detectEnvironment = function () {
    let fs = require("fs");
    let currentpath = process.cwd(), config = {
        page_path: currentpath,
        comm: "",
        coms_path: '',
        app: process.env.APP || './',
        page: '',
    };
    var env_path = [];
    return new Promise(function (ok) {
        fs.readdir(currentpath, function (error, names) {
            if (error) return console.error(error);
            var coms_path = [];
            var public_path = [];
            names.filter(function (name) {
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
            config.coms_path = coms_path.join(',');
            var exists_envpath = (a, extt) => fs.existsSync(path.join(currentpath, a, 'setup' + extt));
            env_path = env_path.filter(a => exists_envpath(a, '.bat') || exists_envpath(a, '.cmd') || exists_envpath(a, '.sh'));
            if (public_path.length === 1) {
                config.public_path = public_path[0];
            }
            if (1 !== env_path.length) {
                setenv(config);
            } else {
                process.env.config_path = env_path[0];
                require("./setupenv");
            }
            ok();
        });
    });
};
var demos = ["kugou", "zimoli"];
var public_commands = "test public init watch live";
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
            console.info(`可以使用的命令有: ${public_commands}`);
            return;
        }
        console.info(`目前没有与 <blue2>${value1}</blue2> 相关的帮助信息！`);
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
        require("../server/main");
        if (cluster.isMaster) console.info('可以通过浏览器访问打开的端口以查看文档\r\n');
    },
    demo(appname = 'kugou') {
        setenv({
            public_path: path.join(__dirname, "../../apps"),
            page_path: path.join(__dirname, "../../apps"),
            coms_path: path.join(__dirname, "../../coms"),
            IN_TEST_MODE: true,
            app: appname
        });
        require("./setupenv");
        require("../server/main");
        if (cluster.isMaster) console.info(`可以通过浏览器访问已打开的端口以查看示例项目:<blue2>${appname}</blue2>\r\n`);
    },
    create(appname = "kugou") {
        require("../../tools/create")(appname);
    },
    dev(appname) {
        startDevelopEnv(appname);
    },
    live(appname) {
        detectEnvironment().then(function () {
            startDevelopEnv(appname);
        }).catch(console.error);
    },
    start() {
        require("./setupenv");
        require("../server/main");
    },
    set(key, value) {
        // var filepath = path.join(require('os').homedir(), '.efront/config.bat');
        // fs.readFileSync(filepath);
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
    run(appname, ...args) {
        if (!appname) {
            console.info("请输入要启动的程序!");
            return;
        }
        var fullpath = process.cwd();
        detectWithExtension(appname, ["", ".js", ".ts", "/index.js", "/index.ts"], [fullpath]).then(function (f) {
            setenv({
                app: path.relative(fullpath, f),
                coms: './',
                coms_path: './',
            })
        }).catch(function () {
            detectEnvironment().then(function () {
                require("./run")(appname, args);
            }).catch(console.error);
        });
    },
    public(app_Name, module_Name) {
        if (app_Name && !module_Name) {
            if (/:[^\\\/]*$/.test(app_Name)) {
                module_Name = /\:([^\\\/]*)$/.exec(app_Name)[1];
                app_Name = app_Name.slice(0, app_Name.length - module_Name.length - 1);
            }
            process.env.APP = app_Name;
        }
        var module_Name = module_Name || process.argv.slice(3).filter(a => /^([^\\\/\.\:]+)$/.test(a))[0];
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
var run = function (type, value1, value2) {
    if (type) type = type.toLowerCase();
    if (!type) {
        startServer();
        return;
    }
    with (commands) {
        switch (type) {
            case "-v":
            case "--v":
            case "version":
                version();
                break;
            case "help":
                help(value1);
                break;
            case "docs":
            case "doc":
                docs();
                break;
            case "demo":
                demo(value1);
                break;
            case "from":
                if (!value1) {
                    throw new Error("语法：efront from APPNAME \r\n APPNAME为zimoli,kugou之一");
                }
                create(value1, value2);
            case "blank":
            case "init":
            case "create":
                create("blank", value1);
                break;
            case "test":
                dev(value1);
                break;
            case "live":
            case "lone":
                live(value1);
                break;
            case "start":
                start();
                break;

            case "publish":
            case "release":
                process.env.RELEASE = 1;
            case "public":
                var publicOnly = true;
            case "build":
                if (!publicOnly) {
                    detectEnvironment().then(public);
                } else {
                    public(value1, value2);
                }
                break;
            case "record":
            case "robber":
                record();
                break;
            case "https":
                var https_port = value1;
            case "server":
            case "serve":
            case "serv":
            case "http":
                if (!https_port) {
                    https_port = value2;
                }
                var http_port = value1 || 80;
                serv(http_port, https_port);
                break;
            case "password":
                password(value1, value2);
                break;
            case "watch":
                break;
            case "run":
                run.apply(null, process.argv.slice(3));
                break;
            default:
                var isRun = /[\/\$\\]|_test$|\.[tj]sx?$/i.test(type);
                if (isRun) {
                    run.apply(null, process.argv.slice(2));
                } else {
                    console.info(`不支持该命令<red2> ${type} </red2>`);
                }
        }
    }
};
var quit = function (e) {
    console.error(e);
    process.exit(1);
};
process.on("uncaughtException", quit);
process.on("unhandledRejection", quit);
process.on("exit", function () {
    if (cluster.isMaster && !/win32/.test(process.platform)) {
        console.log();
    }
});
var type = process.argv[2];
var value1 = process.argv[3];
var value2 = process.argv[4];
run(type, value1, value2);