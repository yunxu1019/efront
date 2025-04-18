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
    if (db.open || db.visit) {
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
    var lang = getLang(req);
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
                    var dbs = await userdata.getDBS();
                    if (!dbs[dbid]) {
                        res.writeHead(403, utf8error);
                        res.end(i18n[lang]`${dbid}不存在`);
                        return;
                    }
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
    var db = await getDB(dbid);
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
                res.writeHead(200, utf8json);
                return res.end(JSON.stringify(db));
            }
            if (pageSize) {
                pageSize = +pageSize;
                if (search || searchText || pageSize >= 0) {
                    query = parseKV(query);
                    if (!db.open) {
                        if (!db.visit) {
                            res.writeHead(403, utf8error);
                            res.end(i18n[lang]`此数据不可查询！`);
                            return;
                        }
                        var owner = checkOwner(req, db);
                        if (!isHandled(owner)) {
                            res.writeHead(403, utf8error);
                            res.end(i18n[lang]`不可查询私有数据！`);
                            return;
                        }
                        query.owner = owner;
                    }
                    var data = await message.invoke('dbFind', [dbid, query, lastId, pageSize, searchText]);
                    if (dbid === '用户') trimUser(data);
                }
                else {
                    if (!db.open) {
                        res.writeHead(403, utf8error);
                        res.end(i18n[lang]`此数据不可枚举`);
                        return;
                    }
                    var data = await message.invoke('dbList', [dbid, lastId, -pageSize]);
                }
            }
            else {
                if (lastId) {
                    try {
                        data = await readItem(req, dbid, lastId, version);
                    } catch (e) {
                        res.writeHead(403, utf8error);
                        res.end(String(e));
                        return;
                    }
                }
                else {
                    if (!db.open) {
                        res.writeHead(403, utf8error);
                        res.end(i18n[lang]`此数据不可枚举`);
                        return;
                    }
                    var data = await message.invoke('dbList', [dbid, null, 20]);
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
            try {
                data = await patchItem(req, dbid, lastId, data);
            }
            catch (e) {
                res.writeHead(403, utf8error);
                res.end(String(e));
                return;
            }
            break;
        case "put"://覆盖
            var data = await readRequestAsJson(req);
            try {
                data = await addItem(req, dbid, lastId, data);
            } catch (e) {
                res.writeHead(403, utf8error);
                res.end(String(e));
                return;
            }
            break;
        case "delete":
            try {
                data = await deleteItem(req, dbid, lastId);
            } catch (e) {
                res.writeHead(403, utf8error);
                res.end(String(e));
                return;
            }
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
var addItem = async function (req, dbid, lastId, data) {
    var lang = getLang(req);
    if (dbid === '用户') {
        if (!data.a) throw i18n[lang]`请设置用户密码`;
        if (!data.name) throw i18n[lang]`请设置用户名`;
        await userdata.setPasswordA(String(data.a), data);
        delete data.a;
        if (!data.id) {
            data.id = data.name;
        }
        var msg = checkUid(data, lang);
    }
    else {
        var db = await getDB(dbid);
        var owner = await checkOwner(req, db);
        if (!owner) {
            if (!await checkAuth(req, ['dbw'])) throw i18n[lang]`请登录后重试`;
            msg = checkField(data, ["owner"], lang);
        }
        else {
            msg = checkField(data, ["owner", 'mtime', 'ctime'], lang);
            data.mtime = data.ctime = +new Date;
            data.owner = owner;
        }
    }
    var msg = msg || checkId(data, lang);
    if (msg) throw msg;
    if (!lastId) lastId = data.id || '';
    var origin = await message.invoke('dbLoad', [dbid, lastId]);
    if (origin) throw i18n[lang]`已存在名为${lastId}的${dbid}`;
    data = await message.invoke('dbSave', [dbid, data]);
    return data;
};
var deleteItem = async function (req, dbid, lastId) {
    var lang = getLang();
    if (!lastId) throw i18n[lang]`参数异常`;
    var origin = await message.invoke('dbLoad', [dbid, lastId]);
    if (!isHandled(origin)) throw i18n[lang]`数据不存在`;
    var db = await getDB(dbid);
    var owner = await checkOwner(req, db, origin);
    if (!owner) {
        if (await checkAuth(req, ["dbd"]) && !origin.owner);
        else throw i18n[lang]`您不能删除别人的数据`;
    }
    data = await message.invoke('dbDrop', [dbid, lastId]);
    return data;
};
var patchItem = async function (req, dbid, lastId, data) {
    if (dbid === "用户" && data.a) {
        await userdata.setPasswordA(String(data.a), data);
        delete data.a;
    }
    var lang = getLang();
    var origin = await message.invoke('dbLoad', [dbid, lastId]);
    if (!origin) throw i18n[lang]`不存在名为${lastId}的${dbid}`;
    var db = await getDB(dbid);
    var owner = await checkOwner(req, db, origin);
    a: if (!owner) {
        if (!origin.owner) {
            if (await checkAuth(req, ["dbw"])) break a;
        }
        throw i18n[lang]`您不能修改其他用户的数据`;
    }
    if (data.owner && data.owner !== owner) throw i18n[lang]`请不要冒充其他用户！`;
    var msg = checkField(data, ['mtime', 'ctime'], lang);
    if (msg) throw msg;
    data.owner = owner;
    if (data.id && data.id !== origin.id) throw i18n[lang]`数据标识不可更改！`;
    data = await message.invoke('dbPatch', [dbid, lastId, data]);
    return data;
};

var trimUser = function (dbid, data) {
    if (isArray(data)) data.forEach(d => {
        delete d.c;
        delete d.d;
    });
    else if (isObject(data)) {
        delete data.c;
        delete data.d;
    }
};

var readItem = async function (req, dbid, lastId, version) {
    var lang = getLang();
    if (version) version = +version;
    var data = await message.invoke('dbLoad', [dbid, lastId, version]);
    if (dbid === '用户') trimUser(data);
    if (!isHandled(data)) throw i18n[lang]`数据不存在！`;
    if (data.buffer instanceof ArrayBuffer) {
        var ext = lastId && path.extname(lastId);
        if (ext) {
            data.mime = mime[ext.slice(1)];
        }
    }
    var db = await getDB(dbid);
    if (!checkOwner(req, db, data)) throw i18n[lang]`您无权访问此数据！`;
    return data;
}
var getDB = async function (dbid) {
    var dbmap = await userdata.getDBS();
    var db = dbmap[dbid];
    return db;
}
doDB.getDB = getDB;
doDB.getItem = readItem;
doDB.patchItem = patchItem;
doDB.deleteItem = deleteItem;
doDB.addItem = addItem;
