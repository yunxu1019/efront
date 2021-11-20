var detectWithExtension = require("../build/detectWithExtension");
var commbuilder = require("./commbuilder");
var userdata = require("../server/userdata");
var comspath = require("./inCom").comms_root;
var fs = require('fs');
var required_cache = Object.create(null);

var createFunction = async function (data, __require, pathname) {
    var content = String(data);
    var { params, imported, required, data } = commbuilder.parse(content, pathname, pathname);
    var func = Function.apply(null, params.concat(data));
    if (!(imported instanceof Array)) imported = [];
    imported = imported.map(a => {
        if (typeof a === 'number') return __require(required[a]);
        return __require(a);
    });
    const imported_1 = await Promise.all(imported);
    return func.apply(func, imported_1);
};

var taskmap = {};
var gettask = async function (taskid) {
    var task = await userdata.option("task", taskid, 0);
    if (!task) throw new Error(`指定的任务 ${taskid} 不存在！`);
    if (!task) return null;
    var task = createFunction(task.code, async function (pathname) {
        if (global[pathname] !== undefined) return global[pathname];
        switch (pathname) {
            case "undefined": return undefined;
            case "require": return require;
            case "os":
            case "vm":
            case "net":
            case "zlib":
            case "http":
            case "https":
            case "crypto":
                return require(pathname);
            case "runtask":
                return _runtask;
            case "_private":
                return _private;
        }
        if (pathname === 'undefined') return undefined;
        if (pathname === 'require') return require;
        if (pathname === 'http') return http;
    }, 'private/main');
    return task;
};

var _runtask = required_cache.runtask = async function (taskid, ...params) {
    if (!taskmap[taskid]) taskmap[taskid] = gettask(taskid);
    var t = await taskmap[taskid];
    return t(...params);
};

var _private = async function (privateid) {
    var data = await userdata.option("private", privateid, 0);
    return data.value;
};

var initcom = function (__require, pathname) {
    return new Promise(function (ok, oh) {
        fs.readFile(pathname, function (error, data) {
            if (error) return oh(error);
            createFunction(data, __require, pathname).then(ok, oh);
        });
    });
};

function require2(pathname, __require) {
    if (global[pathname]) return global[pathname];
    if (required_cache[pathname]) return required_cache[pathname];
    return required_cache[pathname] = detectWithExtension(pathname, ['', '.js', '.mjs', '.ts', '.json'], comspath).then(initcom.bind(null, __require), function (e) {
        return require(pathname);
    }).then(function (res) {
        return required_cache[pathname] = res;
    })

}
module.exports = require2;