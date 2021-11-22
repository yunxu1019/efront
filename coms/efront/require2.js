var detectWithExtension = require("../build/detectWithExtension");
var commbuilder = require("./commbuilder");
var userdata = require("../server/userdata");
var comspath = require("./inCom").comms_root;
var fs = require('fs');
var required_cache = Object.create(null);

var createFunction = async function (data, __require, pathname) {
    var content = String(data);
    var { params, imported, required, data } = commbuilder.parse(content, pathname, pathname, false);
    var func = Function.apply(null, params.concat(data));
    if (!(imported instanceof Array)) imported = [];
    imported = imported.map(a => {
        if (typeof a === 'number') return __require(required[a]);
        return __require(a);
    });
    const imported_1 = await Promise.all(imported);
    return func.apply(func, imported_1);
};

var taskmap = {}, loadtime = userdata.loadtime;
var gettask = async function (taskid) {
    var task = await userdata.option("task", taskid, 0);
    if (!task) throw new Error(`指定的任务 ${taskid} 不存在！`);
    if (task.status !== 1) throw new Error(`任务 ${taskid} 未启用！`);
    var task = await createFunction(task.code, async function (pathname) {
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
    }, 'private/main');
    var params = /\(\s*([\s\S]*?)\s*\)/.exec(task);
    if (params) {
        task.params = params[1].split(",").map(p => {
            var [key] = p.split("=");
            if (key) key = key.trim();
            return { key, name: key };
        });
    }
    return task;
};
var getLoadedTask = async function (taskid) {
    if (loadtime !== userdata.loadtime) {
        loadtime = userdata.loadtime;
        for (var k in taskmap) delete taskmap[k];
    }
    if (!taskmap[taskid]) taskmap[taskid] = gettask(taskid);
    return await taskmap[taskid];
};
var _runtask = required_cache.runtask = async function (taskid, ...params) {
    var t = await getLoadedTask(taskid);
    return t(...params);
};

var _private = async function (privateid) {
    var data = await userdata.option("private", privateid, 0);
    if (!data) throw `密钥 ${privateid} 不存在！`;
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
require2.getTaskParams = async function (taskid) {
    var task = await getLoadedTask(taskid);
    var params = JSON.stringify(task.params);
    return require("../crypt/encode62").timeencode(params);
};
require2.invokeTask = async function (taskid, data) {
    var task = await getLoadedTask(taskid);
    var params = task.params;
    if (params) {
        data = require("../crypt/encode62").timedecode(data);
        data = JSON.parse(data);
        params = params.map(p => data[p.key]);
        var res = await task(...params);
    }
    else {
        var res = await task();
    }
    if (res) res = require("../crypt/encode62").timeencode(JSON.stringify(res));
    return res;
};
module.exports = require2;