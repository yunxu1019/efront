var fields = refilm`
&原始名称/origin read
输入新名称/name input
`;
function main({ path: root, name }) {
    var a = view();
    a.innerHTML = edit;
    drag.on(a.firstChild, a);
    var origin = name.replace(/\/$/, '');
    renderWithDefaults(a, {
        fields,
        pathlist: root,
        origin,
        isFolder: /\/$/.test(name),
        data: { name: origin, origin },
        remove() {
            remove(a);
        },
    });
    on('submit')(a, async function (e) {
        e.preventDefault();
        var path = root.concat(a.$scope.data.name).join('/');
        path = encode62.timeencode(path);
        if (origin) {
            var to = path;
            path = origin;
            path = encode62.timeencode(path);
        }
        await data.from("folder", { opt: origin ? 'mov' : 'add', path, to }).loading_promise;
        dispatch(this, 'submited');
    });
    on("append")(a, lazy(function () {
        a.querySelector("input").focus();
    }));
    return a;
}