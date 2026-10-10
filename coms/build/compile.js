var fs = require("fs");
var path = require("path");
var fsp = fs.promises;
var searchPath = require("./searchPath");
var globals = require("../efront/globals");
var window = {
    setTimeout,
    setInterval,
    Array,
    parseInt,
    console: {
    },
    parseFloat,
    Boolean,
    Number,
    Event: {},
    unescape() { },
    escape() { },
    String,
    Object,
    NaN,
    Math,
    module: true,
    exports: true,
    require: true,
    Date,
    Infinity,
    Error,
    TypeError,
    devidePixelRatio: 1,
    isFinite,
    isNaN,
    clearTimeout,
    clearInterval,
    Function,
    navigator: { userAgent: "" },
    globalStorage: {},
    sessionStorage: {},
    localStorage: {},
    location: {},
    RegExp,
    encodeURIComponent,
    decodeURIComponent,
    history: {},
    document: {
        createElement() { return {}; },
        createEvent() {
            return {};
        },
        documentElement: {
            addBehavior() { }
        }
    },
    screen: {},
    modules: {
        state: {},
        init: {},
        put: {},
        prepare: {},
        MOVELOCK_DELTA: 3,
        SAFE_CIRCLE_DEPTH: 300,
        efrontPath: '',
        renderPixelRatio: {},
        calcPixel: {},
        freePixel: {},
        fromPixel: {},
    },
    Image: {},
    Promise: {},
    alert() {
    }
};
window.window = window;
var componentIncreasedId = 0;
var { PREFIX } = require("../efront/memery");
function getComponentId() {
    componentIncreasedId++;
    return PREFIX + componentIncreasedId.toString(26).replace(/\d/g, a => String.fromCharCode('q'.charCodeAt(0) + +a));
}

async function compile(buildInfo) {
    var { searchpath, searchname, realpath, url, builder, extt } = buildInfo;
    if (!realpath && searchpath && searchname) {
        var fullpath = await searchPath(searchpath, searchname, extt);
        realpath = fullpath[0];
    }
    if (!realpath) {
        if (!buildInfo.writed) {
            if (window.modules[url]) console.info(i18n`${url} 将被内置模块替换！`);
            else if (!window.hasOwnProperty(url)) {
                var color = globals[url] || colors.FgRed2;
                var colored = `${color}${url}${colors.Reset}`;
                buildInfo.warn = globals[url] ? colored : i18n`没有发现文件：${colored}`;
            }
            else console.info(i18n`${url} 将使用运行环境的全局变量`);
        }
        delete buildInfo.data;
        buildInfo.writed = true;
        return;
    }
    try {
        var stat = await fsp.stat(realpath);
    } catch (error) {
        if (error) throw new Error(i18n`读取文件信息出错${url}`);
    }
    var watchurls = buildInfo.watchurls;
    if (!watchurls) watchurls = buildInfo.watchurls = [], watchurls.time = 0;
    var mtime = buildInfo.mtime;
    if (buildInfo.mtime && +stat.mtime <= mtime) a: {
        if (watchurls.length) for (var url1 of watchurls) {
            try {
                var stat1 = await fsp.stat(url1);
                if (stat1.mtime >= mtime) {
                    break a;
                }
            } catch { }
        }
        return;
    }
    if (buildInfo.mtime) console.info(`文件变化，正在重新编译${url}`);
    buildInfo.mtime = new Date;
    delete buildInfo.writed;
    var buffer = null;
    if (!stat.isFile()) {
        if (!stat.isDirectory()) {
            throw new Error(i18n`源路径不存在文件${url}`);
        }
        var packagepath = path.join(realpath, 'package.json');
        var index = 'index';
        if (fs.existsSync(packagepath)) {
            var data = await fsp.readFile(packagepath);
            data = JSON.parse(String(data));
            if (data.main) index = data.main;
        }
        await detectWithExtension(realpath, index, ["", ".js", '.mjs', '.cjs', '.ts', "/index", "/index.js", '/index.ts']);
        buffer = `require("./${index.replace(/^\.?[\\\/]/g, '')}")`
    }
    else {
        buffer = await fsp.readFile(realpath);
    }
    var id = buildInfo.id;
    if (!id) {
        id = $split(buildInfo.destpath.replace(/\..*$/, "")).pop();
        id = '/' + getComponentId() + ' ' + id.replace(/^[\s\S]*?([^\-\\\/\:\.\s]*)$/, "$1");
        buildInfo.id = id;
    }
    if (buffer && builder) watchurls.splice(0, watchurls.length), buildInfo.data = await builder(buffer, id, realpath, watchurls);
    else if (buffer) buildInfo.data = buffer;
    else delete buildInfo.data;
}

var linesEnabled = 1;
module.exports = async function (buildInfo) {
    if (!linesEnabled) await wait(function () {
        return linesEnabled
    });
    linesEnabled--;
    await compile(buildInfo);
    linesEnabled++;
    return buildInfo;
};