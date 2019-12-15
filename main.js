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
try {

    if (isHelpMode) {
        console.log("these commands can be used: test server public init watch from");
    } else if (isDocsCommand) {
        setenv({
            public_path: path.join(__dirname, "apps"),
            coms_path: path.join(__dirname, "coms"),
            page_path: path.join(__dirname, "apps"),
            app: "docs"
        });
        require("./process/setupenv");
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
    } else if (isTestMode) {
        require("./tester/main");
    } else if (isServerMode) {
        require("./server/index");
    } else if (isPublicMode) {
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
            process.env.EXPORT_TO = module_Name;
        }
        require("./tools/build");
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
        require("./process/efront")(loadModule[0]);
    } else if (isStartCommand) {
        require("./process/setupenv");
        require("./server/main");
    } else {
        var fullpath = process.cwd();
        setenv({
            public_path: path.dirname(fullpath),
            app: path.basename(fullpath)
        });
        require("./process/setupenv");
        require("./server/main");
    }
} catch (e) {
    console.error(e);
    process.exit(1);
}