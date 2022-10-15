var fields = refilm`
文件
`;
var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
async function upload(f, base) {
    var api = await data.getApi('upload');
    var authorization = await data.getSource(api.base);
    var xhr = cross(api.method, api.base + base + f.name, { authorization: authorization });
    xhr.setRequestHeader('range', 'bytes=1-' + f.size);
    return xhr.send(f);
}
var copyed = null;
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
        data.setInstance("pathlist", $scope.pathlist.slice(0, -1));
        $scope.open();
        return false;
    }

    extend(page.$scope, {
        pathlist: data.getInstance("pathlist"),
        load(p) {
            data.setInstance("pathlist", this.pathlist);
            var base = data.getInstance("base").base;
            return data.from("folder", { opt: 'list', path: encode62.timeencode(p) }, files => {
                if (files) return files.map(f => {
                    var isfolder = /\/$/.test(f);
                    return {
                        name: f.replace(/\/$/, ''),
                        isfolder,
                        host: base,
                        where: p,
                        url: base + f,
                        fullpath: p + "/" + f,
                        type: isfolder ? 'folder' : 'file',
                    }
                });
            });
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