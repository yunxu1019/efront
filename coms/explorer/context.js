var getActive = e => {
    var s = e.currentTarget.$scope;
    return s.toActive(e);
};
var notGetActive = e => !getActive(e);
var getStable = e => {
    var a = getActive(e);
    if (!a) return;
    return !a.$scope.d.pending;
};
var getSelected = function (d) {
    var p = getPageScope(d);
    return p.selected;
}
var getPageScope = function (d) {
    var $scope = d.$scope.d ? d.$parentScopes[d.$parentScopes.length - 1] : d.$scope;
    return $scope;
};
var never = function () { return false };
var popupRen = function (d) {
    var $scope = getPageScope(d);
    var selected = $scope.selected;
    var active;
    if (d.$scope === $scope) {
        if (selected.length !== 1) return;
        active = selected[0];
    }
    else {
        active = d.$scope.d;
    }
    if (d.$scope.pending) return;
    popupEdit($scope, active);
};
var popupAdd = function (d) {
    var $scope = getPageScope(d);
    popupEdit($scope, null);
};
var popupEdit = function ($scope, active) {
    var params = {
        path: $scope.pathlist.join('/'),
        hasName: $scope.hasName.bind($scope),
        rename: $scope.rename,
        add: $scope.add,
        name: active ? active.name : '',
    };
    if (active) params.isfolder = active.isfolder;
    else params.isfolder = true;

    zimoli.prepare('explorer$edit', function () {
        var p = popup("#explorer$edit", params);
        on('submited')(p, function () {
            $scope.open();
            remove(p);
        });
    })

};
return extend([
    {
        name: i18n`返回(O)`,
        hotkey: "backspace",
        when: never,
        do() {
            history.back();
        }
    },
    {
        name: i18n`打开(O)`,
        hotkey: "Enter",
        when: never,
        do(d) {
            var scope = getPageScope(d);
            if (scope.selected.length !== 1) return d;
            scope.open(scope.selected[0]);
        }
    },
    {
        name: i18n`剪切(C)`,
        hotkey: "Ctrl+X",
        when: getStable,
        do(d) {
            var copyed = getPageScope(d).copyed;
            for (var c of copyed.splice(0, copyed.length)) c.cut = false;
            for (var c of getSelected(d)) c.cut = true, copyed.push(c);
        }
    },
    {
        name: i18n`复制(R)`,
        hotkey: "Ctrl+C",
        when: getStable,
        do(d) {
            var copyed = getPageScope(d).copyed;
            if (copyed) for (var c of copyed.splice(0, copyed.length)) c.cut = false;
            for (var c of getSelected(d)) c.cut = false, copyed.push(c);
        }
    },
    {
        name: i18n`全选(A)`,
        hotkey: "Ctrl+A",
        when: never,
        do(d) {
            var scope = getPageScope(d);
            scope.selected = scope.data.filter(a => !a.pending);
            for (var s of scope.selected) s.selected = true;
        }
    },
    {
        name: i18n`替换(R)`,
        when: never,
    },
    {
        name: i18n`粘贴(V)`,
        hotkey: "Ctrl+V",
        when(e) {
            var copyed = getPageScope(e.target).copyed;
            if (!copyed.length) return false;
            return !getActive(e);
        },
        async do(d) {
            var copyed = getPageScope(d).copyed;
            if (!copyed.length) return;
            var cp = copyed.splice(0, copyed.length);
            var $scope = getPageScope(d);
            var pathbase = "/" + $scope.pathlist.join("/").replace(/^\/+|\/+$/g, '');
            for (var c of cp) {
                if (pathbase.indexOf(c.fullpath.replace(/^\/+|\/+$/g, '')) >= 0) {
                    return alert.warn(i18n`不能移入子文件夹`);
                }
            }
            var token = await $scope.getToken();
            for (var c of cp) {
                var newname = c.name;
                if ($scope.hasName(c.name)) {
                    newname = prompt(i18n`请输入新的${cp.isfolder ? i18n`文件夹` : i18n`文件`}名:`, function (a) {
                        if (isEmpty(a)) return false;
                        if ($scope.hasName(a)) return i18n`命名冲突`
                        return explorer$filetip(a);
                    });
                    newname.querySelector("input,textarea").value = c.name.replace(/\/$/, '');
                    newname = await newname;
                }
                if (c.cut) await $scope.mov(c, pathbase + "/" + newname);
                else {
                    var offunload = on("beforeunload")(window, function (event) {
                        event.preventDefault();
                        alert(i18n`有文件正在复制！`);
                        return false;
                    });
                    var task = explorer$deepcp($scope, c, pathbase + "/" + newname);
                    task.token = token;
                    try {
                        await task;
                    } catch { };
                    offunload();
                }
                c.cut = false;
            }
            $scope.open();
        }
    },
    {
        name: i18n`新建文件夹(D)`,
        when: notGetActive,
        do: popupAdd
    },
    {
        name: i18n`添加文件(F)`,
        when: notGetActive,
        async do(d) {
            var $scope = getPageScope(d);
            return $scope.uploadAll(await chooseFile());
        }
    },
    {
        hotkey: "F2",
        name: i18n`重命名(R)`,
        when: getStable,
        do: popupRen
    },
    {
        get name() {
            return this.confirm ? i18n`确认删除(D)` : i18n`删除(D)`;
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
                await yousure(i18n`确认要删除如下 ${selected.length} 项吗？`, elem);
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
            for (var s of $scope.selected) s.abort(), await $scope.delete("/" + $scope.pathlist.concat(s.name).join("/"));
            $scope.open();
        }
    }
])