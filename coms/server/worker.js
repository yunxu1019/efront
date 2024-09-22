var message = require('../message');
var path = require("path");
var memery = require("../efront/memery");
var dbmap = Object.create(null);

var dbdir = path.join(memery.DATA_PATH, 'db');
var fs = require('fs');
var fsp = fs.promises;

var getdb = async function (id) {
    var d = dbmap[id];
    if (!d) {
        var dbpath = path.join(dbdir, id);
        d = dbmap[id] = new FolderDB(dbpath);
        if (!fs.existsSync(dbpath)) {
            await fsp.mkdir(dbpath, { recursive: true });
        }
        await d.init();
    }
    return d;
};
message.dbList = async function ([baseId, lastId, pageSize]) {
    var db = await getdb(baseId);
    return db.list(lastId, pageSize);
};
message.dbSave = async function ([baseId, data]) {
    var db = await getdb(baseId);
    return db.save(data);
};
message.dbPatch = async function ([baseId, lastId, data]) {
    var db = await getdb(baseId);
    return db.patch(lastId, data);
};
message.dbFind = async function ([baseId, params, lastId, pageSize]) {
    var db = await getdb(baseId);
    return db.find(params, lastId, pageSize);
};
message.dbLoad = async function ([baseId, dataId]) {
    var db = await getdb(baseId);
    return db.load(dataId);
};
message.disconnect = function () {
    message.close();
}
message.listen();