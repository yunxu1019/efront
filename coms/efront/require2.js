var detectWithExtension = require("../build/detectWithExtension");
var commbuilder = require("./commbuilder");
var userdata = require("../server/userdata");
var mixin = require("./mixin");
var { COMM, coms_path } = require("./memery");
COMM = COMM.split(",");
var index = COMM.indexOf('zimoli');
if (index >= 0) COMM.splice(index, 0, 'reptile');
else COMM.push('reptile');
var fs = require('fs');
var path = require("path");
var comspath = mixin(coms_path, COMM).map(c => path.join.apply(path, c)).filter(fs.existsSync);
var required_cache = Object.create(null);
var hasOwnProperty = {}.hasOwnProperty;
var loadingTree = Object.create(null);
var loadedModules = Object.create(null);
var prepareFunction = function (pathname) {
    if (loadedModules[pathname]) return loadedModules[pathname];
    if (loadingTree[pathname]) return loadingTree[pathname];
    return loadingTree[pathname] = new Promise(function (ok, oh) {
        fs.readFile(pathname, function (error, data) {
            if (error) return oh(error);
            var f = createFunction(data, pathname);
            loadedModules[pathname] = f;
            delete loadingTree[pathname];
            f.prepare().then(function () {
                ok(f);
            }, oh);
        });
    });
};
var createModule = function (required, prebuilds, pathmap, modname) {
    if (typeof modname === "number") modname = required[modname];
    if (prebuilds && hasOwnProperty.call(prebuilds, modname)) return prebuilds[modname];
    switch (modname) {
        case "require": return this.require;
        case "undefined": return undefined;
        case "runtask": case "_runtask": return _runtask;
        case "module": return this;
        case "exports": return this.exports;
    }
    if (global[modname] !== undefined) return global[modname];
    if (hasOwnProperty.call(pathmap, modname)) return require2(pathmap[modname]);
    return require(modname);
};
var prepareModule = function (dirname, required, prebuilds, pathmap, modname) {
    if (typeof modname === "number") modname = required[modname];
    if (prebuilds && hasOwnProperty.call(prebuilds, modname)) return;
    if (/^(require|_runtask|undefined|module)$/.test(modname)) return;
    if (/^(module|exports)$/.test(modname)) return;
    if (global[modname] !== undefined) return;
    if (/^[\.\/\\]/.test(modname)) var searchpath = [dirname].concat(comspath);
    else var searchpath = comspath;
    return detectWithExtension(modname, ['', '.js', '.mjs', '.ts', '.json'], searchpath).then(p => {
        pathmap[modname] = p;
        return prepareFunction(p);
    }, () => { });
};

var createFunction = function (data, pathname, prebuilds) {
    var content = String(data);
    var { params, imported, data, required, isAsync, isYield } = commbuilder.parse(content, pathname, pathname);
    var func = eval(`[${isAsync ? 'async ' : ""}function${isYield ? "*" : ""}(${params ? params.join(",") : ''}){\r\n${data}\r\n}][0]`);
    if (!(imported instanceof Array)) imported = [];
    var pathmap = {};
    func.require = createModule.bind(func, required, prebuilds, pathmap);
    func.require.cache = required_cache;
    func.imported = imported;
    func.required = required;
    func.prepare = async function () {
        var dirname = path.dirname(pathname);
        var prepare = prepareModule.bind(func, dirname, required, prebuilds, pathmap);
        if (!(imported instanceof Array)) imported = [];
        if (!(required instanceof Array)) required = [];
        imported = imported.map(prepare);
        required = imported.map(prepare);
        await Promise.all(imported);
        await Promise.all(required);
        delete func.prepare;
    };
    return func;
};
var invokeFunction = function (func, context) {
    if (func.prepare) return func.prepare().then(function () {
        return invokeFunction(func, context);
    });
    var { imported, require } = func;
    func.exports = context || {};
    if (imported instanceof Array && require instanceof Function) imported = imported.map(require);
    a: if (!context) {
        var ismodule = false;
        for (var m of imported) {
            if (/^(exports|module)$/.test(m)) {
                ismodule = true;
                break a;
            }
        }
        context = global;
    }
    return imported instanceof Array ? func.apply(context, imported) : func.call(context);
};

var taskmap = {}, loadtime = userdata.loadtime;
var gettask = async function (taskid) {
    var task = await userdata.option("task", taskid, 0);
    if (!task) throw new Error(`指定的任务 ${taskid} 不存在！`);
    if (task.status !== 1) throw new Error(`任务 ${taskid} 未启用！`);
    var func = createFunction(task.code, 'private/main', { _private });
    var task = await invokeFunction(func);
    var params = /\(\s*([\s\S]*?)\s*\)/.exec(task);
    if (params) {
        params = params[1];
        if (params) task.params = params.split(",").map(p => {
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


function require2(pathname) {
    if (hasOwnProperty.call(required_cache, pathname)) return required_cache[pathname];
    var func = prepareFunction(pathname);
    if (func instanceof Promise) {
        return required_cache[pathname] = func.then(f => {
            required_cache[pathname] = f.exports || {};
            return required_cache[pathname] = invokeFunction(f, required_cache[pathname]);
        });
    }
    return required_cache[pathname] = invokeFunction(func);
}
require2.createFunction = createFunction;
require2.invokeFunction = invokeFunction;
require2.getTaskParams = async function (taskid) {
    var task = await getLoadedTask(taskid);
    var params = JSON.stringify(task.params);
    return require("../crypt/encode62").timeencode(params || null);
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