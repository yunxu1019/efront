var fields = refilm`
文件
`;
var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
var pending = [];
async function upload(f, dist, token) {
    var api = await data.getApi("upload");
    var p = {};
    if (token) {
        var { base, authorization } = token;
        var start = f.start || 0;
        var end = start + f.size - 1;
        var xhr = cross(api.method, base + dist, { authorization });
        xhr.setRequestHeader('range', `bytes=${start}-${end}`);
        xhr.send(f.data);
        var p = { url: base + dist, percent: f.start / f.total, abort: xhr.abort.bind(xhr) };
        pending.push(p);
        xhr.error(function (e) {
            alert.error(e);
        });
        render.refresh();
        await xhr;
        removeFromList(pending, p);
    }
    else {
        var authorization = data.getSource(api.base);
        /**
         * @type {XMLHttpRequest}
         */
        var p = { percent: 0, pending: true, name: f.name, folder: dist };
        dist = dist.replace(/^\/+|\/+$/g, '');
        if (dist) p.url = api.base + dist + "/" + f.name;
        else p.url = api.base + f.name;
        this.data.push(p);
        pending.push(p);
        var xhr = cross(api.method, p.url, { authorization });
        p.abort = xhr.abort.bind(xhr);
        xhr.upload.onprogress = function ({ loaded, total }) {
            p.percent = loaded / total;
            render.refresh();
        };
        xhr.send(f);
        xhr.error((e) => {
            alert.error(e);
            removeFromList(this.data, p);
            removeFromList(pending, p);
        });
        await xhr;
        removeFromList(pending, p);
    }
    return xhr;
}
var copyed = null;
class File {
    constructor(f) {
        var isfolder = /\/$/.test(f);
        this.name = f.replace(/\/+$/, '');
        this.isfolder = isfolder;
        this.type = isfolder ? 'folder' : 'file';
    }
    get pending() {
        for (var p of pending) {
            if (p.url.indexOf(this.url) === 0) {
                this.percent = p.percent;
                return p;
            }
        }
        return false;
    }
    abort() {
        var p = this.pending;
        if (!p) return;
        p.abort();
    }
}
function main(path) {
    var page = explorer$main();
    extend(page.$scope, {
        pathlist: path ? path.split('/') : [],
        read(from, start, size) {
            var authorization = data.getSource(data.getInstance("base").base);
            var xhr = cross("get", from.url, { authorization: authorization });
            var end = start + size - 1;
            xhr.setRequestHeader('range', `bytes=${start}-${end}`);
            xhr.send();
            return xhr;
        },
        load(p, force) {
            if (!force) {
                location.href = "#/wow/root" + p;;
                return { then() { } };
            }
            var base = data.getInstance("base").base;
            var p = this.pathlist.join('/').replace(/^\/+|\/+$/g, '');
            var bp = p ? base + p + "/" : base;
            p = p + '/';
            return data.from("folder", { opt: 'list', path: encode62.timeencode(p) }, files => {
                if (files) return files.map(f => {
                    var file = new File(f);
                    file.host = base;
                    file.where = p;
                    file.url = bp + f;
                    file.fullpath = p + f;
                    return file;
                });
            });
        },
        async getToken() {
            var api = await data.getApi('upload');
            var authorization = await data.getSource(api.base);
            return { authorization, base: api.base };
        },
        upload,
        async delete(path) {
            return data.from("folder", { opt: 'del', path: encode62.timeencode(path) })
        },
        async rename(from, to) {
            from = encode62.timeencode(from);
            to = encode62.timeencode(to);
            await data.from("folder", { opt: 'mov', path: from, to }).loading_promise;
        },
        async add(name) {
            name = encode62.timeencode(name);
            await data.from("folder", { opt: 'add', path: name }).loading_promise;
        },
        async mov(from, distpath) {
            var currentHost = data.getInstance("base").base;
            if (from.host !== currentHost) return alert("暂不支持跨服务器操作！");
            from = encode62.timeencode(from.fullpath);
            distpath = encode62.timeencode(distpath);
            await data.from("folder", { opt: 'mov', path: from, to: distpath }).loading_promise;
        }
    });
    page.$scope.open();
    return page;
}