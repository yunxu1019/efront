var getActive = e => {
    var s = e.currentTarget.$scope;
    return s.toActive(e);
};
var notGetActive = e => !getActive(e);
var getSelected = function (d) {
    var p = getPageScope(d);
    return p.selected;
}
var getPageScope = function (d) {
    var $scope = d.$scope.d ? d.$parentScopes[d.$parentScopes.length - 1] : d.$scope;
    return $scope;
};
var never = function () { return false };
var popupEdit = function (d) {
    var $scope = getPageScope(d);
    var active = $scope.toActive(d);
    var params = {
        path: $scope.pathlist.join('/'),
        hasName: $scope.hasName.bind($scope),
        rename: $scope.rename,
        add: $scope.add,
        name: active ? active.$scope.d.name : '',
    };

    zimoli.prepare('explorer$edit', function () {
        var p = popup("#explorer$edit", params);
        on('submited')(p, function () {
            $scope.open();
            remove(p);
        });
    })

};
var copyed = [];
return extend([
    {
        name: "打开(O)",
        hotkey: "backspace",
        when: never,
        do() {
            history.back();
        }
    },
    {
        name: "打开(O)",
        hotkey: "Enter",
        when: never,
        do(d) {
            var scope = getPageScope(d);
            if (scope.selected.length !== 1) return d;
            scope.open(scope.selected[0]);
        }
    },
    {
        name: "剪切(C)",
        hotkey: "Ctrl+X",
        when: getActive,
        do(d) {
            if (copyed) for (var c of copyed.splice(0, copyed.length)) c.cut = false;
            for (var c of getSelected(d)) c.cut = true, copyed.push(c);
        }
    },
    {
        name: "复制(R)",
        hotkey: "Ctrl+C",
        when: getActive,
        do(d) {
            if (copyed) for (var c of copyed.splice(0, copyed.length)) c.cut = false;
            for (var c of getSelected(d)) c.cut = false, copyed.push(c);
        }
    },
    {
        name: "全选(A)",
        hotkey: "Ctrl+A",
        when: never,
        do(d) {
            var scope = getPageScope(d);
            scope.selected = scope.data.slice(0);
            for (var s of scope.selected) s.selected = true;
        }
    },
    {
        name: "替换(R)",
        when: never,
    },
    {
        name: "粘贴(V)",
        hotkey: "Ctrl+V",
        when(e) {
            if (!copyed.length) return false;
            return !getActive(e);
        },
        async do(d) {
            if (!copyed.length) return;
            var cp = copyed.splice(0, copyed.length);
            var $scope = getPageScope(d);
            var pathbase = "/" + $scope.pathlist.join("/").replace(/^\/+|\/+$/g, '');
            for (var c of cp) {
                if (pathbase.indexOf(c.fullpath.replace(/^\/+|\/+$/g, '')) >= 0) {
                    return alert.warn("不能移入子文件夹");
                }
            }
            var token = await $scope.getToken();
            for (var c of cp) {
                var newname = c.name;
                if ($scope.hasName(c.name)) {
                    newname = prompt(`请输入新的${cp.isfolder ? '文件夹' : "文件"}名:`, function (a) {
                        if (isEmpty(a)) return false;
                        if ($scope.hasName(a)) return "命名冲突"
                        return explorer$filetip(a);
                    });
                    newname.querySelector("input,textarea").value = c.name.replace(/\/$/, '');
                    newname = await newname;
                }
                if (c.cut) await $scope.mov(c, pathbase + "/" + newname);
                else {
                    var task = explorer$deepcp($scope, c, pathbase + "/" + newname);
                    task.token = token;
                    await task;
                }
                c.cut = false;
            }
            $scope.open();
        }
    },
    {
        name: "新建文件夹(D)",
        when: notGetActive,
        do: popupEdit
    },
    {
        name: "添加文件(F)",
        when: notGetActive,
        async do(d) {
            var $scope = getPageScope(d);
            return $scope.uploadAll(await chooseFile());
        }
    },
    {
        hotkey: "F2",
        name: '重命名(R)',
        when: getActive,
        do: popupEdit
    },
    {
        get name() {
            return this.confirm ? "确认删除(D)" : "删除(D)";
        },
        hotkey: "Shift+Del",
        confirm: false,
        when(e) {
            this.confirm = null;
            return getActive(e);
        },
        type: "danger",
        async do(e, global) {
            var selected = getSelected(e);
            if (global) {
                var elem = div();
                elem.innerHTML = `<fileitem -repeat="d in selected"></fileitem>`;
                render(elem, { fileitem: explorer$fileitem, selected });
                await yousure(`确认要删除如下 ${selected.length} 项吗？`, elem);
            }
            else if (this.confirm === null) {
                this.confirm = e;
                setTimeout(_ => {
                    this.confirm = false;
                    render.refresh();
                }, 2000);
                return false;
            }
            this.confirm = false;
            var $scope = getPageScope(e);
            for (var s of $scope.selected) await $scope.delete("/" + $scope.pathlist.concat(s.name).join("/"));
            $scope.open();
        }
    }
], { copyed })