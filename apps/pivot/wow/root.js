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
        var xhr = cross(api.method, dist + f.name, { authorization });
        var p = { percent: 0, pending: true, name: f.name, folder: dist, abort: xhr.abort.bind(xhr) };
        dist = dist.replace(/^\/+|\/+$/g, '');
        if (dist) p.url = api.base + dist + "/" + f.name;
        else p.url = api.base + f.name;
        this.data.push(p);
        pending.push(p);
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
        removeFromList(this.data, p);
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
function main() {
    var page = explorer$main();
    var backtime = 0;
    page.onback = function () {
        var $scope = this.$scope;
        if (!$scope.pathlist.length) {
            if (Date.now() - backtime < 2022) alert("已是根目录！");
            backtime = Date.now();
            return false;
        }
        if ($scope.pathlist) {
            var name = $scope.pathlist.pop();
            var base = data.getInstance("base").base;
            var p = $scope.pathlist.join("/").replace(/^\/+|\/+$/g, '');
            var bp = p ? base + p + '/' : base;
            p = p + '/';
            data.setInstance("pathlist", $scope.pathlist);
            name = name.replace(/^\/+|\/+$/g, '');
            $scope.selected = [{
                name,
                isfolder: true,
                where: p,
                host: base,
                url: bp + name + "/",
                fullpath: p + name + "/",
                type: 'folder'
            }];
        }
        $scope.open();
        return false;
    }

    extend(page.$scope, {
        pathlist: data.getInstance("pathlist"),
        read(from, start, size) {
            var authorization = data.getSource(data.getInstance("base").base);
            var xhr = cross("get", from.url, { authorization: authorization });
            var end = start + size - 1;
            xhr.setRequestHeader('range', `bytes=${start}-${end}`);
            xhr.send();
            return xhr;
        },
        load(p) {
            data.setInstance("pathlist", this.pathlist);
            var base = data.getInstance("base").base;
            var p = p.replace(/^\/+|\/+$/g, '');
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