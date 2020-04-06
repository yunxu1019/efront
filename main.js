#!/usr/bin/env node
var path = require('path');
require("./process/console");
var configs = function () {
    var config = {};
    process.argv.slice(2).forEach(function (key, cx) {
        key = key.toLowerCase();
        config[key] = true;
    });
    return config;
}();

var setenv = function (evn) {
    Object.assign(process.env, evn);
};


var isTestMode = configs.test;
var isHelpMode = configs.help;
var isPublicMode = configs.build || configs.public || configs.release || configs.publish;
var isWatchMode = configs.watch;
var isServerMode = configs.server || configs.serve;
var isInitCommand = configs.init || configs.from;
var isDocsCommand = configs.doc || configs.docs;
var isDemoCommand = configs.demo || configs.zimoli;
var loadModule = process.argv.slice(2).filter(e => /[\/\\]|_test$|\.[tj]sx?$/i.test(e));
var isStartCommand = configs.start || configs.run;
var isRobber = configs.bug || configs.record || configs.robber;
var isLone = configs.lone || configs.live;
var isSettingPassword = configs.password;
var detectEnvironment = function () {
    let fs = require("fs");
    let currentpath = process.cwd(), config = {
        page_path: currentpath,
        comm: "./,zimoli",
        coms_path: '',
        app: './',
        page: './',
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
                require("./process/setupenv");
            }
            ok();
        });
    });
};
var startDevelopEnv = function () {
    require("./process/setupenv");
    require("./process/console");
    process.env.IN_TEST_MODE = true;
    require("./server/main");
};
try {

    if (isHelpMode) {
        console.log("these commands can be used: test server public init watch live");
    } else if (isRobber) {
        var fullpath = process.cwd();
        setenv({
            public_path: fullpath,
            record_path: fullpath,
            app: "./"
        });
        require("./server/main");
    } else if (isLone) {
        detectEnvironment().then(function () {
            startDevelopEnv();
        }).catch(console.error);
    } else if (isDocsCommand) {
        setenv({
            public_path: path.join(__dirname, "docs"),
            coms_path: path.join(__dirname, "coms"),
            page_path: path.join(__dirname, 'docs'),
            comm: 'docs,zimoli',
            page: './',
            app: "docs"
        });
        require("./server/main");
    } else if (isDemoCommand) {
        setenv({
            public_path: path.join(__dirname, "apps"),
            page_path: path.join(__dirname, "apps"),
            coms_path: path.join(__dirname, "coms"),
            app: "kugou"
        });
        require("./process/setupenv");
        require("./server/main");
    } else if (isSettingPassword) {
        require("./process/password").requestPassword();
    } else if (isTestMode) {
        startDevelopEnv();
    } else if (isServerMode) {
        require("./server/index");
    } else if (isPublicMode) {
        var public = function () {
            if (loadModule.length === 1) {
                var app_Name = loadModule[0], module_Name;
                if (/:[^\\\/]*$/.test(app_Name)) {
                    module_Name = /\:([^\\\/]*)$/.exec(app_Name)[1];
                    app_Name = app_Name.slice(0, app_Name.length - module_Name.length - 1);
                }
                process.env.APP = app_Name;
            }
            if (configs.release || configs.publish) {
                process.env.RELEASE = 1;
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
            require("./build");
        };
        if (configs.build) {
            detectEnvironment().then(public);
        } else {
            public();
        }
    } else if (isInitCommand) {
        if (configs.from) {
            var index = process.argv.map(a => a.toLowerCase()).indexOf('from');
            var appname = process.argv[index + 1];
            if (!appname) {
                throw new Error("语法：efront from APPNAME \r\n APPNAME为zimoli,kugou之一")
            }
        }
        require("./tools/create")(appname);
    } else if (isWatchMode) {
        require("./tools/watch");
    } else if (loadModule.length > 0) {
        detectEnvironment().then(function () {
            require("./process/efront")(loadModule[0]);
        }).catch(console.error);
    } else if (isStartCommand) {
        require("./process/setupenv");
        require("./server/main");
    } else {
        var fullpath = process.cwd();
        setenv({
            public_path: fullpath,
            app: "./"
        });
        require("./process/setupenv");
        require("./server/main");
    }
} catch (e) {
    console.error(e);
    process.exit(1);
}