var isFolder = false;
var hasOrigin = false;

function main({ path: root, rename, isfolder, add, name, hasName }) {
    var fields = refilm`
    &原始名称/origin read
    输入新名称/name input
    `;
    fields[1].valid = function (name) {
        if (!name) return '';
        if (name === origin) return "";
        if (hasName(name)) return "命名冲突";
        return explorer$filetip(name);
    };
    var origin = name.replace(/\/$/, '');
    var a = view();
    isFolder = isfolder;
    hasOrigin = !!origin;
    a.innerHTML = edit;
    drag.on(a.firstChild, a);
    renderWithDefaults(a, {
        fields,
        pathlist: root,
        origin,
        page: a,
        data: { name: origin, origin },
        remove() {
            remove(a);
        },
    });
    on('submit')(a, async function (e) {
        e.preventDefault();
        var path = root + "/" + a.$scope.data.name;
        if (origin) {
            var to = path;
            path = root + '/' + origin;
        }
        if (origin) await rename(path, to);
        else await add(path)
        dispatch(this, 'submited');
    });
    on("append")(a, lazy(function () {
        a.querySelector("input").focus();
    }));
    return a;
}