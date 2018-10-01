titlebar("文件管理器");
var page = createVboxWithState(state);
page.innerHTML = `
<list></list>
`;

var roots = [];
var currentFolder = [];
var request = function (value, folder) {
    if (!request.rest) request.rest = [];
    var { rest, loading } = request;
    if (folder && folder !== request.folder) {
        if (isNumber(loading)) {
            clearTimeout(loading);
        } else if (loading) {
            loading.cancel();
            loading = false;
        }
        rest.splice(0, rest.length);
    };
    if (value) {
        rest.push(value);
        request.folder = folder;
    }
    if (loading) return;
    request.loading = setTimeout(function () {
        var files = request.rest.splice(0, rest.length);
        if (!files.length) return rest.loading = false;
        request.loading = api("/file/info", {
            files: files.map(function (file) {
                return file.name;
            }),
            folder: request.folder
        }).success(function (result) {
            result.result.map(function (file, cx) {
                extend(files[cx], file);
            });
            _list.refresh();
            request.loading = false;
            if (request.rest.length) request();
        }).error(function () {
            request.loading = false;
            if (request.rest.length) request();
        });
    }, 200);
}
var _list = tree(function (data) {
    var { value } = data;
    var { isFolder } = value;
    if (isFolder) {
        return role$folder(value);
    }
    if (!value.isFile) {
        request(value, value.folder);
    }
    return role$file(value);
});
onactive(_list, function (event) {
    var { value, item } = event;
    if (value.isFolder && !item.length) {
        _list.add(value.children.map(function (name) {
            return {
                tab: data.tab + 1,
                name,
                folder: value.pathname,
                pathname: (value.pathname + "/" + name).replace(/\\/g, "/")
            };
        }), item);
        item.closed = true;
    } else if (value.isFile) {
        if (view$image.support(item.value)) {
            var viewer = view$image(item);
        } else if (view$video.support(item.value)) {
            var viewer = view$video(item);
        }
        if (viewer) {
            popup(viewer);
        }
    }
})
render(page, {
    go,
    List(a) {
        return _list;
    },
    btn(a) {
        return button(a);
    }
})
page.initialStyle = "margin-left:100%;z-index:2;";
onback(function () {
})
api("/file/info").success(function (response) {
    roots = currentFolder = response.result;
    roots.map(function (a) {
        a.tab = 0;
    })
    _list.src(roots);
    _list.go(0);
});
function main() {
    return page;
}