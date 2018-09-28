var support = image.support = function (file) {
    return /\.(?:gif|png|jpe?g)$/i.test(file.pathname);
};
function image(list, index = 0) {
    if (list.value.isFile) {
        var temp = list;
        list = list.parent;
    }
    list = list.filter(function (a) {
        return support(a.value);
    });
    if (list.length < 0) {
        return alert("nofile")
    }
    index = list.indexOf(temp);
    if (index < 0) index = 0;
    var viewer = slider(function (index) {
        if (index >= list.length) return false;
        if (index < 0) return false;
        var elem = div();
        var data = list[index];
        css(elem, {
            backgroundImage: `url('@${encodeURIComponent(data.value.pathname)}')`
        });
        return elem;
    });
    once("append")(viewer, function () {
        viewer.go(index);
    });
    ontouchend(viewer, function () {
        remove(viewer);
    });
    return viewer;
}