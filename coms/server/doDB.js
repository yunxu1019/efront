var message = require('../message');
var userdata = require("./userdata");
var utf8json = { 'content-type': 'application/json;charset=utf8' };
var lock30 = require("../efront/lock")(30);
var checkRole = function (req, db) {
    if (db.open) return true;
    var user = req.socket.user;
    if (user) {
        return checkroles(user.roles, db.roles);
    }
    return checkAuth(req, db.roles);
}
var doDB = async function (req, res) {
    var lang = getHeader(req.headers, "accept-language");
    try {
        var { pathname = '', search, query } = parseURL(req.url.slice(1));
        pathname = decodeURIComponent(pathname.slice(1));
    } catch (e) {
        res.writeHead(403, utf8error);
        res.end(i18n[lang]`禁止访问`);
        return;
    }
    var [dbid, lastId] = pathname.split('/');

    if (!dbid) {
        if (!await checkAuth(req, ["dbr"])) {
            res.writeHead(403, utf8error);
            res.end(i18n[lang]`禁止访问`);
            return;
        }
        var dbs = await userdata.getOptionsList('db', 'id');
        res.writeHead(200, utf8json);
        res.end(JSON.stringify(dbs));
        return;
    }
    var method = req.method.toLowerCase();
    if (method !== 'get' && lastId === undefined) {
        if (!await checkAuth(req, ["dbw"])) {
            res.writeHead(403, utf8error);
            res.end(i18n[lang]`禁止访问`);
            return;
        }
        switch (method) {
            case "put":
                if (await userdata.hasOption('db', dbid)) {
                    lock30("register-" + remoteAddress(req))
                    res.writeHead(403, utf8error);
                    res.end(i18n[lang]`${dbid}已存在`);
                    return;
                }
                var data = await readRequestAsJson(req);
                await userdata.setOptionObj('db', dbid, data);
                break;
            case "post":
                var data = await readRequestAsJson(req);
                if (!data) {
                    res.writeHead(403, utf8error);
                    res.end(i18n[lang]`${dbid}不存在`);
                    return;
                }
                delete data.itemcount;
                await userdata.patchOptionObj('db', dbid, data);
                break;
            case "delete":
                var data = await userdata.getOptionObj('db', dbid);
                if (data.itemcount > 0) {
                    // 管理员无权删除有数据的库表
                    res.writeHead(403, utf8error);
                    res.end(i18n[lang]`数据不为空`);
                    return;
                }
                await userdata.removeOption('db', dbid);
                break;
        }
        await message.broadcast('reloadUserdata');
        res.end();
        return;
    }
    var dbmap = await userdata.getDBS();
    var db = dbmap[dbid];
    if (!db) {
        res.writeHead(404, utf8json);
        res.end(i18n[lang]`${dbid}不存在`);
        return;
    }
    switch (method) {
        case "get":
            if (!lastId && !await checkRole(req, db)) {
                res.writeHead(403, utf8error);
                res.end(i18n`您没有权限访问此内容`);
                return;
            }
            if (lastId === undefined) {
                return res.end(JSON.stringify(db));
            }
            if (lastId) {
                var [lastId, pageSize] = lastId.split(',');
            }
            else pageSize = 20;
            if (pageSize) {
                pageSize = +pageSize;
                if (search || pageSize >= 0) {
                    query = parseKV(query);
                    var data = await message.invoke('dbFind', [dbid, query, lastId, pageSize]);
                }
                else {
                    var data = await message.invoke('dbList', [dbid, lastId, -pageSize]);
                }
            }
            else {
                if (lastId) {
                    var data = await message.invoke('dbLoad', [dbid, lastId]);
                }
                else {
                    var data = await message.invoke('dbList', [dbid, null, 20]);
                }
            }
            if (dbid === '用户') {
                if (isArray(data)) {
                    data.forEach(d => {
                        delete d.c;
                        delete d.d;
                    });
                }
                else if (isObject(data)) {
                    delete data.c;
                    delete data.d;
                }
            }
            break;
        case "post"://补丁
            var data = await readRequestAsJson(req);
            if (dbid === "用户" && data.a) {
                await userdata.setPasswordA(String(data.a), data);
                delete data.a;
            }
            var origin = await message.invoke('dbLoad', [dbid, lastId]);
            if (!origin) {
                res.writeHead(403, utf8error);
                res.end(i18n[lang]`不存在名为${lastId}的${dbid}`);
                return;
            }
            data = await message.invoke('dbPatch', [dbid, lastId, data]);
            break;
        case "put"://覆盖
            var data = await readRequestAsJson(req);
            if (dbid === '用户') {
                if (!data.a) {
                    res.writeHead(403, utf8error);
                    res.end(i18n[lang]`请设置用户密码`);
                    return;
                }
                await userdata.setPasswordA(String(data.a), data);
                delete data.a;
            }
            var origin = await message.invoke('dbLoad', [dbid, lastId]);
            if (origin) {
                res.writeHead(403, utf8error);
                res.end(i18n[lang]`已存在名为${lastId}的${dbid}`);
                return;
            }
            data = await message.invoke('dbSave', [dbid, data]);
            break;
        case "delete":
            data = await message.invoke('dbDrop', [dbid, lastId]);
            break;
    }
    res.writeHead(200, utf8json);
    res.end(JSON.stringify(data));
};
