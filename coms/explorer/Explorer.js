class Explorer {
    pathlist = [];
    selected = [];
    data = [];
}
var e = Explorer.prototype;
e.fileitem = explorer$fileitem;
e.hasName = function (name) {
    for (var d of this.data) if (d.name === name && !d.cut) return true;
    return false;
}
e.load = function (p) { return [] }
e.open = async function (p) {
    if (p) {
        if (!p.isfolder) return;
        this.pathlist.push(p.name);
    }
    p = "/" + this.pathlist.join("/").replace(/^\/+|\/+$/g, '');
    var cutedMap = Object.create(null);
    var selected = Object.create(null);
    for (var s of this.selected) selected[s.url] = true;
    for (var s of explorer$context.copyed) cutedMap[s.url] = s.cut;
    var files = await this.load(p);
    for (var f of files) {
        if (cutedMap[f.url]) f.cut = true;
        else if (selected[f.url]) f.selected = true;
    }
    if (files) this.data = files.sort(function (a, b) {
        return sortname(a.name, b.name);
    }).sort(function (a, b) {
        return b.isfolder - a.isfolder;
    });
    this.selected = files.filter(f => f.selected);
}
e.delete = function () { alert("无法删除！") }
e.mov = function () { alert("无法移动！") }
e.copy = function () { alert("无法复制！") }
e.read = function () { alert("无法读取文件内容！") }
e.rename = function () { alert("无法重命名！") }
e.upload = function () { alert("添加失败！") }
e.getToken = function () { }
e.uploadAll = async function (files) {
    var $scope = this;
    var dist = $scope.pathlist.join("/");
    dist = dist.replace(/^\/+|\/+$/, '') + "/";
    await queue.call(files, function (f) {
        return $scope.upload(f, dist);
    });
    $scope.open();
}

e.toActive = function (e) {
    var plattice = this.listview;
    return getTargetIn(e => e.parentNode && e.parentNode.parentNode === plattice, e.target);
}
e.unsetActive = function (event, file) {
    if (onclick.preventClick) return;
    var e = this.toActive(event);
    if (!e) return;
    if (file.selected === 1) {
        file.selected = true;
        return;
    }
    for (var s of this.selected) {
        s.selected = s === file;
    }
    this.selected = [file];
}
e.setActive = function (event, file) {
    var e = this.toActive(event);
    if (!e || !file.selected) {
        if (!event.ctrlKey) {
            for (var s of this.selected) {
                s.selected = false;
            }
            this.selected = [];
        }
    }
    if (e && !file.selected) {
        file.selected = 1;
        if (this.selected.indexOf(file) < 0) this.selected.push(file);
    }
};