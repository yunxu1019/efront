var path = require('path');
var fs = require('fs');
var fsp = fs.promises;
mark.setPinyin(pinyin);

var src = "0123456789ABCDEFGHIJKLMNPQRSTUVW";
var createId = function (indexed) {
    var now = new Date;
    var time = now.getFullYear()
        + src[now.getMonth() + 1]
        + src[now.getDate()]
        + src[now.getHours()]
        + src[now.getMinutes() >> 1]
        + src[now.getSeconds() >> 1];
    var inc = now.getMilliseconds();
    var getid = function () {
        var id = time;
        var pad = inc++ << 2 | (now.getMinutes() & 1) << 1 | now.getSeconds() & 1;
        if (pad < 10) id += '000';
        else if (pad < 100) id += '00';
        else if (pad < 1000) id += '0';
        id += pad;
        return id;
    };
    var id = getid();
    while (indexed[indexed.length - 1].slice(0, id.length) === id) id = getid();
    id += Math.random().toString(36).slice(2, 12).toUpperCase();
    indexed.push(id);
    return id;
};
var extractMap = {
    "image/png": '.png',
};
var extractReg = new RegExp(`^data:(${Object.keys(extractMap).join('|').replace(/\//g, '\\/')});base64,`, 'i');
var extractBase64 = async function (d, directory, id) {
    for (var k in data) {
        var d = data[k];
        if (isObject(d)) {
            await extractBase64(d, directory, id + '-' + k);
        }
        else if (isString(d) && d.length > 512) {
            var m = extractReg.exec(d);
            if (m) {
                var e = extractMap[m[0].toLowerCase()];
                var n = id + "-" + k + e;
                await fsp.writeFile(path.join(directory, n), Buffer.from(d.slice(m[0].length), 'base64url'));
                data[k] = n;
            }
        }
    }
};
var dbExt = '.json';

class FolderDB {
    indexed = null;
    static createId = createId;
    constructor(directory) {
        this.directory = directory;
    }
    async init() {
        if (this.indexed) return;
        var indexed = await fsp.readdir(this.directory, { withFileTypes: true });
        indexed = indexed.filter(a => a.isFile()).map(a => a.name).filter(a => a.slice(a.length - dbExt.length) === dbExt);
        indexed.sort();
        this.indexed = indexed.map(a => a.replace(/\.[^\.]+$/i, ''));
    }
    async list(lastId, pagesize) {
        var indexed = this.indexed;
        pagesize = pagesize | 0;
        if (pagesize <= 0) pagesize = 10;
        if (pagesize > 60) pagesize = 60;
        var index = indexed.indexOf(lastId) + 1;
        return indexed.slice(index, index + pagesize);
    }
    async find(params, lastId, pageSize, searchText) {
        var indexed = this.indexed;
        if (pageSize > 60) pageSize = 60;
        var index = lastId ? indexed.lastIndexOf(lastId) : indexed.length;
        if (index <= 0) return [];
        var result = [];
        var start = Math.max(0, index - 2000);
        while (index > start && result.length < pageSize) {
            var data = await this.load(indexed[--index]);
            if (params && !check(data, params)) continue;
            b: if (searchText) {
                for (var k in data) {
                    var v = data[k];
                    if (typeof v !== "string" || !/^\_?(?:name|desc(?:ription)?)$/i.test(k)) continue;
                    if (mark.power(v, searchText)[0] > searchText.length - 0.2) break b;
                }
                continue;
            }
            result.push(data);
        }
        return result;
    }
    async load(id) {
        var hasExt = /\.[^\.]+$/.test(id);
        var buff = await fsp.readFile(path.join(this.directory, hasExt ? id : id + dbExt));
        if (hasExt) return buff;
        var data = JSON.parse(String(buff));
        return data;
    }
    async save(data) {
        var id = data.id;
        var directory = this.directory;
        if (isEmpty(id)) {
            id = createId(this.indexed);
            data.id = id;
        }
        var datapath = path.join(directory, data.id + dbExt);
        extractBase64(data, directory, id);
        data = JSON.stringify(data);
        await fsp.writeFile(datapath, data);
        return id;
    }
    async patch(lastId, pdata) {
        var data = await this.load(lastId);
        if (!data) return null;
        if (pdata.id && pdata.id !== lastId) {
            await this.drop(lastId);
        }
        extend(data, pdata);
        await this.save(data);
        return data.id;
    }
    async drop(id) {
        await fsp.unlink(path.join(this.directory, id + dbExt));
        var indexed = this.indexed;
        var i = indexed.indexOf(id);
        if (i >= 0) indexed.splice(i, 1);
        return id;
    }

}