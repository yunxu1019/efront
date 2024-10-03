var message = require('../message');
var userdata = require("./userdata");
var path = require('path');
var utf8json = { 'content-type': 'application/json;charset=utf8' };
var lock30 = require("../efront/lock")(30);
var checkRead = function (req, db) {
    if (db.open) return true;
    var user = req.socket.user;
    if (user) {
        return checkroles(user.roles, db.roles);
    }
    return checkAuth(req, db.roles);
};
var checkOwner = async function (req, db, origin) {
    if (db.open) {
        var user = req.socket.user;
        if (!user) {
            await checkAuth(req);
            user = req.socket.user;
        }
        if (!user) return false;
        var owner = user.id;
        if (!origin) return owner;
        if (origin.owner !== owner) return false;
        return owner;
    }
}
var checkUid = function (data, lang) {
    var id = data.id;
    if (/^[\d\_\-]+$/.test(id)) {
        // 为电话号码预留
        return i18n[lang]`数据标识不能是纯数字`;
    }
    if (/@/.test(id)) {
        // 为邮箱预留
        return i18n[lang]`数据标识不能有“@”符号`;
    }
    if (/\./.test(id)) {
        // 防止被识别为扩展名
        return i18n[lang]`数据标识不能有“.”符号`;
    }
}
var checkId = function (data, lang) {
    var id = data.id;
    if (!id) return;
    var id1 = spaces.format(id);
    if (id !== id1) id = data.id = id1;
    var m = /[\*\?\|\/\\\>\<"\:]/.exec(id);
    if (m) {
        return i18n[lang]`数据标识不能有特殊符号“${m[0]}”`
    }
};
var checkField = function (data, fnames, lang) {
    for (var f of fnames) {
        if (f in data) {
            return i18n[lang]`数据中不能有${f}字段`;
        }
    }
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
    var [dbid, lastId, version] = pathname.split('/');
    var method = req.method.toLowerCase();

    if (!dbid) {
        if (!await checkAuth(req, ["dbr"]) || method !== 'get') {
            res.writeHead(403, utf8error);
            res.end(i18n[lang]`禁止访问`);
            return;
        }
        var dbs = await userdata.getOptionsList('db', 'id');
        res.writeHead(200, utf8json);
        res.end(JSON.stringify(dbs));
        return;
    }
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
                await userdata.patchOptionObj('db', dbid, data);
                break;
            case "delete":
                var data = await userdata.getOptionObj('db', dbid);
                if (!data) {
                    res.writeHead(403, utf8error);
                    res.end(i18n[lang]`${dbid}不存在`);
                    return;
                }
                var items = await message.invoke('dbList', [dbid, null, 1]);
                if (items.length > 0) {
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
            if (lastId) {
                var [lastId, pageSize, searchText] = lastId.split(',');
                pageSize = +pageSize;
            }
            if (!lastId && !await checkRead(req, db)) {
                res.writeHead(403, utf8error);
                res.end(i18n[lang]`您没有权限访问此内容`);
                return;
            }
            if (lastId === undefined) {
                return res.end(JSON.stringify(db));
            }
            if (pageSize) {
                pageSize = +pageSize;
                if (search || searchText || pageSize >= 0) {
                    query = parseKV(query);
                    var data = await message.invoke('dbFind', [dbid, query, lastId, pageSize, searchText]);
                }
                else {
                    var data = await message.invoke('dbList', [dbid, lastId, -pageSize]);
                }
            }
            else {
                if (lastId) {
                    if (version) version = +version;
                    var data = await message.invoke('dbLoad', [dbid, lastId, version]);
                    if (!isHandled(data)) {
                        res.writeHead(404, utf8error);
                        res.end(i18n[lang]`数据不存在！`);
                        return;
                    }
                    var ext = path.extname(lastId);
                    if (ext) {
                        data.mime = mime[ext.slice(1)];
                    }
                    else {
                        data.mime = mime.json;
                    }
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
            if (!lastId) {
                res.writeHead(403, utf8error);
                res.end(i18n[lang]`参数错误！`);
                return;
            }
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
            var owner = await checkOwner(req, db, origin);
            a: if (!owner) {
                if (!origin.owner) {
                    if (await checkAuth(req, ["dbw"])) break a;
                }
                res.writeHead(403, utf8error);
                res.end(i18n[lang]`您不能修改其他用户的数据`);
                return;
            }
            if (data.owner && data.owner !== owner) {
                res.writeHead(403, utf8error);
                res.end(i18n[lang]`请不要冒充其他用户！`);
                return;
            }
            msg = checkField(data, ['mtime', 'ctime'], lang);
            if (msg) {
                res.writeHead(403, utf8error);
                res.end(msg);
                return;
            }
            data.owner = owner;
            if (data.id && data.id !== origin.id) {
                res.writeHead(403, utf8error);
                res.end(i18n[lang]`数据标识不可更改！`);
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
                if (!data.name) {
                    res.writeHead(403, utf8error);
                    res.end(i18n[lang]`请设置用户名`);
                    return;
                }
                await userdata.setPasswordA(String(data.a), data);
                delete data.a;
                if (!data.id) {
                    data.id = data.name;
                }
                var msg = checkUid(data, lang);
            }
            else {
                var owner = await checkOwner(req, db);
                if (!owner) {
                    if (!await checkAuth(req, ['dbw'])) {
                        res.writeHead(401, utf8error);
                        res.end(i18n[lang]`请登录后重试`);
                        return;
                    }
                    msg = checkField(data, ["owner"], lang);
                }
                else {
                    msg = checkField(data, ["owner", 'mtime', 'ctime'], lang);
                    data.mtime = data.ctime = +new Date;
                    data.owner = owner;
                }
            }
            var msg = msg || checkId(data, lang);
            if (msg) {
                res.writeHead(403, utf8error);
                res.end(msg);
                return;
            }
            if (!lastId) lastId = data.id || '';
            var origin = await message.invoke('dbLoad', [dbid, lastId]);
            if (origin) {
                res.writeHead(403, utf8error);
                res.end(i18n[lang]`已存在名为${lastId}的${dbid}`);
                return;
            }
            data = await message.invoke('dbSave', [dbid, data]);
            break;
        case "delete":
            if (!lastId) {
                res.writeHead(403, lastId);
                res.end(i18n[lang]`参数异常`);
                return;
            }
            var origin = await message.invoke('dbLoad', [dbid, lastId]);
            if (!isHandled(origin)) {
                res.writeHead(404, utf8error);
                res.end(i18n[lang]`数据不存在`);
                return;
            }
            var owner = await checkOwner(req, db, origin);
            if (!owner) {
                if (await checkAuth(req, ["dbd"]) && !origin.owner);
                else {
                    res.writeHead(403, utf8error);
                    res.end(i18n[lang]`您不能删除别人的数据`);
                    return
                }
            }
            data = await message.invoke('dbDrop', [dbid, lastId]);
            break;
    }
    if (!isHandled(data)) return res.end();
    if (data.buffer instanceof ArrayBuffer) {
        res.writeHead(200, { "content-type": data.mime || utf8json['content-type'] });
        res.end(data);
    }
    else if (isObject(data)) {
        res.writeHead(200, utf8json);
        res.end(JSON.stringify(data));
    }
    else {
        res.end(data);
    }
};
