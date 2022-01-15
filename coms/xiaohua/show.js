function main({ src, index }) {
    var page = view();
    var d = data.getInstance("photo");
    css(page, { width: d.width, height: d.height });
    page.innerHTML = template;
    var head = document.createElement("span");
    var foot = document.createElement("span");
    var _index;
    var update = function (index) {
        _index = index;
        foot.innerHTML = `${index + 1}/${src.length}`;
        head.innerHTML = src[index].href;
    };
    update(index);

    renderWithDefaults(page, {
        index,
        head,
        foot,
        update,
        async del() {
            var f = src[_index];
            await data.from("photo-delete", { _id: f._id, _rev: f._rev });
            src.splice(index, 1);
            remove(page);
        },
        picture() {
            var elem = picture(src, index, encodeurl);
            return elem;
        },
        remove() {
            remove(page);
        },
    })
    drag.on(page.firstChild, page);
    resize.on(page);
    on("resize")(page, function () {
        var s = this.style;
        data.setInstance("photo", { width: s.width, height: s.height });
    })
    // var windows = confirm(head, elem, [foot]);
    // css(elem, "position:relative;height:500px;width:800px");
    // css(windows, "height:600px;width:800px");
    // page.innerHTML = edit;
    return page;
}