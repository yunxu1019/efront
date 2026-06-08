var commbuilder = require("./commbuilder");
var userdata = require("../server/userdata");
var lock = require("./lock");
var lock30 = lock(30000);
var lock60 = lock(60000);
var fs = require('fs');
const fsp = fs.promises;
var path = require("path");
var commparse = commbuilder.parse;
var memery = require("./memery");
var getPathIn = require("../build/getPathIn");
var comspath = [path.join(require("os").homedir(), ".efront", 'plugins')].filter(fs.existsSync);
var required_cache = Object.create(null);
var hasOwnProperty = {}.hasOwnProperty;
var loadingTree = Object.create(null);
var loadedModules = Object.create(null);
var vm = require('vm');
var dynacoms = Object.create(null);
var detectWithExtension = require("../reptile/detectWithExtension");
var webdynas = null;
var loadwebcoms = async function () {
    var fsp = fs.promises;
    var dynaroots = [];
    var read = async function (fullpath) {
        var files = await fsp.readdir(fullpath, { withFileTypes: true });
        var comm = Object.create(null);
        for (var f of files) {
            if (!f.isFile()) continue;
            var fname = f.name;
            var p = path.join(fullpath, fname);
            fname = fname.replace(/\.[^\.]+$/, '');
            comm[fname] = p;
        }
        return comm;
    }
    var load = async function (root, deep) {
        deep++;
        if (deep > 2) return;
        var files = await fsp.readdir(root, { withFileTypes: true });
        var isdynaroot = false;
        for (var f of files) {
            if (!f.isDirectory()) continue;
            var fname = f.name;
            if (/^#/.test(fname)) {
                if (fname === '#abpi') isdynaroot = true;
                continue;
            }
            await load(path.join(root, fname), deep);
        }
        if (isdynaroot) {
            dynaroots.push(root);
        }
    };
    await load(memery.webroot, 0);
    for (var p of dynaroots) {
        dynacoms[p] = await read(path.join(p, '#abpi'));
    }
    return webdynas = dynaroots;
};
if (fs.existsSync(memery.webroot)) {
    dynacoms = fs.promises.readdir(memery.webroot, { withFileTypes: true }).then(files => {
        var webroot = memery.webroot;
        var load = function (root) {
            for (var f of files) {
                if (!f.isDirectory()) continue;
                path.join(root, f.name);
            }
        }
    });
}

var prepareFunction = function (pathname) {
    var that = this;
    if (loadedModules[pathname]) return loadedModules[pathname];
    if (loadingTree[pathname]) return loadingTree[pathname];
    return loadingTree[pathname] = new Promise(function (ok, oh) {
        fs.readFile(pathname, function (error, data) {
            if (error) return oh(error);
            var f = createFunction.call(that, data, pathname);
            loadedModules[pathname] = f;
            delete loadingTree[pathname];
            f.prepare().then(function () {
                ok(f);
            }, oh);
        });
    });
};
var restModules = {
    runtask: _runtask,
    _runtask: _runtask,
    lock: lock60,
    _lock: lock60,
    lock30: lock30,
    _lock30: lock30,
    DB: require("../server/doDB"),
};
var createModule = function (required, pathmap, modname) {
    if (typeof modname === "number") modname = required[modname];
    var prebuilds = this.prebuilds;
    if (prebuilds && hasOwnProperty.call(prebuilds, modname)) return prebuilds[modname];
    if (hasOwnProperty.call(pathmap, modname)) return require2(pathmap[modname]);
    if (hasOwnProperty.call(restModules, modname)) return restModules[modname];
    switch (modname) {
        case "require": return this.require;
        case "undefined": return undefined;
        case "module": return this;
        case "exports": return this.exports;
        case "__dirname": return path.dirname(this.pathname);
        case "__filename": return this.pathname;
    }
    if (/^\.*[\\\/]/.test(modname) && this.pathname) modname = path.join(path.dirname(this.pathname), modname)
    if (path.isAbsolute(modname)) return require2(rootmap[modname]);
    if (global[modname] !== undefined) return global[modname];
    try {
        return require(modname);
    } catch {
        console.error(i18n`加载${modname}失败，引用队列为：` + "\r\n  <red> " + invokingStack.slice().reverse().join(" </red>\r\n  <red> ") + " </red>\r\n");
    }
};
var rootmap = Object.create(null);
var prepareModule = function (dirname, required, prebuilds, pathmap, modname) {
    if (typeof modname === "number") modname = required[modname];
    if (prebuilds && hasOwnProperty.call(prebuilds, modname)) return;
    if (hasOwnProperty.call(restModules, modname)) return;
    if (/^(module|exports|__dirname|__filename)$/.test(modname)) return;
    if (global[modname] !== undefined) return;
    var modname1 = modname;
    if (!/^\.*[\/\\]/.test(modname)) {
        modname1 = modname1.replace(/\//g, '$').replace(/\.[\s\S]+$/, '').replace(/\-(\S)/g, (_, a) => a.toUpperCase());
    }
    if (hasOwnProperty.call(pathmap, modname1)) {
        return prepareFunction.call(this, pathmap[modname1]);
    }
    if (hasOwnProperty.call(this, modname1)) {
        pathmap[modname1] = this[modname1];
        return prepareFunction.call(this, this[modname1]);
    }
    if (/^\.*[\/\\]/.test(modname)) {
        modname1 = path.join(dirname, modname);
    }
    if (path.isAbsolute(modname1)) {
        if (hasOwnProperty.call(rootmap, modname1)) {
            return rootmap[modname1];
        }
        return rootmap[modname1] = detectWithExtension(modname1, ['', '.js', '.mjs', '.json', '.ts']).then(async fullpath => {
            var stats = await fsp.stat(fullpath);
            if (stats.isFile()) {
                await prepareFunction.call(this, fullpath);
                rootmap[modname1] = pathmap[modname] = fullpath;
                return;
            }
            if (stats.isDirectory()) {
                var files = await fsp.readdir(fullpath, { withFileTypes: true });
                var index = null;
                for (var f of files) {
                    if (!f.isFile()) continue;
                    var fname = f.name;
                    if (/^package\.json$/i.test(fname)) {
                        var data = await fsp.readFile(path.join(fullpath, fname));
                        data = JSON.parse(String(data));
                        if (data.main) {
                            index = data.main;
                            break;
                        }
                    }
                    if (/^index\.(js|json|mjs|ts)$/i.test(fname)) {
                        index = fname;
                        continue;
                    }
                }
                if (!index) return;
                fullpath = path.join(fullpath, index);
                await prepareFunction.call(this, fullpath);
                pathmap[modname] = rootmap[modname1] = fullpath;
            }
        });
    }
};
var createFunction = function (data, pathname, prebuilds) {
    var content = String(data);
    var { params, imported, data, required, isAsync, isYield } = commparse.call(this, content, pathname, pathname);
    var func = vm.runInThisContext(`[${isAsync ? 'async ' : ""}function${isYield ? "*" : ""}(${params ? params.join(",") : ''}){\r\n${data}\r\n}][0]`, {
        filename: pathname,
    });
    if (!(imported instanceof Array)) imported = [];
    var pathmap = {};
    func.require = createModule.bind(func, required, pathmap);
    func.require.cache = required_cache;
    func.imported = imported;
    func.required = required;
    func.prebuilds = prebuilds;
    func.pathname = pathname;
    var that = this;
    var promise;
    func.prepare = function () {
        if (!promise) promise = prepare();
        return promise;
    };
    var prepare = async function () {
        if (!webdynas) webdynas = loadwebcoms();
        var dynas = await webdynas;
        var rel = getPathIn(dynas, pathname);
        if (rel) {
            var p = pathname.slice(0, pathname.length - rel.length);
            var coms = dynacoms[p];
            if (coms) pathmap = coms;
        }
        var dirname = path.dirname(pathname);
        var prepare = prepareModule.bind(that, dirname, required, prebuilds, pathmap);
        if (imported instanceof Array) for (var a of imported) await prepare(a);
        if (required instanceof Array) for (var a of required) await prepare(a);
        delete func.prepare;
    };
    return func;
};
var invokingStack = [];
var invokeFunction = function (func, prebuilds) {
    if (func.prepare) return func.prepare().then(function () {
        return invokeFunction(func, prebuilds);
    });

    var { imported, require } = func;
    if (prebuilds) var { context } = prebuilds;
    a: if (!context) {
        var ismodule = false;
        if (imported) for (var m of imported) {
            if (/^(exports|module)$/.test(m)) {
                ismodule = true;
                break a;
            }
        }
        context = global;
    }
    func.prebuilds = prebuilds;
    func.exports = context || {};
    invokingStack.push(func.pathname);
    if (imported instanceof Array && require instanceof Function) imported = imported.map(require);
    invokingStack.pop();
    var hasPromise = false;
    if (imported instanceof Array) {
        for (var f of imported) {
            if (f && typeof f.then === 'function') {
                hasPromise = true;
                break;
            }
        }
        if (!hasPromise) return func.apply(context, imported);
        return Promise.all(imported).then(function (imported) {
            return func.apply(context, imported);
        });
    }
    else {
        return func.call(context);
    }

};

var taskmap = {}, loadtime = userdata.loadtime;
var gettask = async function (taskid) {
    var task = await userdata.getOptionObj("task", taskid);
    if (!task) throw new Error(i18n`指定的任务 ${taskid} 不存在！`);
    if (task.status !== 1) throw new Error(i18n`任务 ${taskid} 未启用！`);
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
    var data = await userdata.getOptionObj("private", privateid);
    if (!data) throw i18n`密钥 ${privateid} 不存在！`;
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
    if (!task) return;
    var params = JSON.stringify(task.params);
    return require("../crypt/encode62").packencode(params || null);
};
require2.invokeTask = async function (taskid, data) {
    var task = await getLoadedTask(taskid);
    if (!task) return;
    var params = task.params;
    if (params) {
        data = require("../crypt/encode62").packdecode(data);
        data = JSON.parse(data);
        params = params.map(p => data[p.key]);
        var res = await task(...params);
    }
    else {
        var res = await task();
    }
    if (res) res = require("../crypt/encode62").packencode(JSON.stringify(res));
    return res;
};
module.exports = require2;