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
function main() {
    async function uploadAll(files) {
        await queue.call(files, function (f) {
            return upload(f, page.$scope.pathlist.join("/"));
        });
        page.$scope.open();
    }
    var page = div();
    page.innerHTML = root;
    page.onback = function () {
        var $scope = this.$scope;
        if (!$scope.pathlist.length) {
            return;
        }
        data.setInstance("pathlist", $scope.pathlist.slice(0, -1));
        $scope.open();
        return false;
    }
    page.setAttribute('ng-mousedown', 'setActive')
    bind('drop')(page, async function (event) {
        event.preventDefault();
        var files = event.dataTransfer.files;
        uploadAll(files);
    });

    renderWithDefaults(page, {
        lattice,
        pathlist: data.getInstance("pathlist"),
        active: null,
        open(p) {
            if (p && !/\/$/.test(p.name)) {
                // window.open("/" + this.pathlist.concat(p.name).join('/'))
                return;
            }
            if (p) p = String(p.name || '').replace(/\/$/, '');
            if (p) data.setInstance("pathlist", this.pathlist.concat(p));
            this.data = data.from("folder", { opt: 'list', path: encode62.timeencode("/" + this.pathlist.join('/')) }, files => {
                if (files) return sortname(files).map(f => {
                    return {
                        name: f,
                        type: /\/$/.test(f) ? 'folder' : 'file'
                    }
                });
            });
        },
        setActive(e) {
            this.active = getActive(e);
        },
        data: [],
    });
    page.$scope.open();
    var getActive = e => {
        var p = page.querySelector('lattice');
        var t = getTargetIn(e => e.parentNode && e.parentNode.parentNode === p, e.target);
        return t;
    };
    var when = e => !!getActive(e);
    var popupEdit = function (e) {
        zimoli.prepare('/wow/edit', function () {
            var p = popup("#/wow/edit", {
                path: page.$scope.pathlist,
                name: e || ''
            });
            on('submited')(p, function () {
                page.$scope.open();
                remove(p);
            });
        })

    };
    contextmenu(page, [
        {
            name: "新建文件夹",
            when: e => !getActive(e),
            do() {
                popupEdit();
            }
        },
        {
            name: "添加文件",
            when: e => !getActive(e),
            do() {
                return chooseFile().then(uploadAll);
            }
        },
        {
            name: '重命名',
            when,
            do(e) {
                popupEdit(e.$scope.d.name);
            }
        },
        {
            get name() {
                return this.confirm ? "确认删除" : "删除";
            },
            confirm: false,
            when(e) {
                this.confirm = false;
                return when(e);
            },
            type: "danger",
            async do(e) {
                if (!this.confirm) {
                    this.confirm = true;
                    setTimeout(_ => {
                        this.confirm = false;
                        render.refresh();
                    }, 2000);
                    return false;
                }
                await data.from("folder", { opt: 'del', path: encode62.timeencode("/" + page.$scope.pathlist.concat(e.$scope.d.name).join("/")) }).loading_promise;
                page.$scope.open();
            }
        }
    ]);
    return page;
}