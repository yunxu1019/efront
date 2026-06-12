var bind = function (hostname) {
    var host = parseURL(hostname);
    var obj = parseURL(location.href);
    host = (host.protocol || obj.protocol) + '//' + (host.host || obj.host) + "/";
    var dbbase = k => host + k;
    // <!--
    dbbase = k => host + k;
    // -->
    var api = {
        headers: {
            authorization: ''
        },
        base: host,
    };
    host += '/';
    var cross = data.cross;
    var DB = function (type, id) {
        var url = dbbase(type);
        if (id) url += '/' + id;
        return cross("get", url, null, api);
    };
    DB.load = function (type, size, idstart) {
        return DB(`${idstart || ''},${size},`);
    };
    DB.info = function (type) {
        return DB(type);
    };
    DB.save = function (type, data) {
        return data.id ? DB.update(type, data) : DB.create(type, data);
    }
    DB.create = function (type, data) {
        return cross("put", dbbase(type) + "/", data, api);
    };
    DB.update = function (type, data) {
        return cross("post", dbbase(type) + "/" + data.id, data, api);
    };
    DB.delete = function (type, data) {
        return cross('delete', dbbase(type) + '/' + data.id, data, api);
    };
    DB.search = function (type, searchObj, size = 20, searchtext, searchstart) {
        if (searchObj) searchObj = "?" + serialize(searchObj);
        return DB(type, `${searchstart || ''},${size},${searchtext}${searchObj || ''}`);
    };
    DB.query = function (type, queryObj, size = 100, queryStart) {
        return DB.search(type, queryObj, size, '', queryStart);
    };
    Object.defineProperty(DB, 'base', {
        get() {
            return api.base;
        },
        set(v) {
            host = v + '/';
            return api.base = v;
        },
    })
    return DB;
};
var db = bind(location.host || location.href);
db.rebind = bind;
return db;