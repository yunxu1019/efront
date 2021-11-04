var fields = refilm`
文件
`;

function main() {
    var page = div();
    page.innerHTML = root;
    page.onback = function () {
        var $scope = this.$scope;
        if (!$scope.pathlist.length) {
            return;
        }
        $scope.pathlist.pop();
        $scope.open();
        return false;
    }
    page.setAttribute('ng-mousedown', 'setActive')

    renderWithDefaults(page, {
        lattice,
        pathlist: [],
        active: null,
        open(p) {
            if (p) p = String(p.name || '').replace(/\/$/, '');
            if (p) this.pathlist.push(p);
            this.data = data.from("folder", { opt: 'list', path: "/" + this.pathlist.join('/') }, files => {
                if (files) return files.map(f => {
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
            name: '编辑',
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
                await data.from("folder", { opt: 'del', path: "/" + page.$scope.pathlist.concat(e.$scope.d.name).join("/") }).loading_promise;
                page.$scope.open();
            }
        }
    ]);
    return page;
}