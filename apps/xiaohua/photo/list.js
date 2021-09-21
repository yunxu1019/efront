var page = div();
page.innerHTML = list;
var stylesheet = page.querySelector("style");
var offdrag;
on("remove")(page, function () {
    offdrag && offdrag();
});
on("append")(page, function () {
    offdrag = on("drop")(window, function (event) {
        event.preventDefault();
        upload(event.dataTransfer.files)
    });
});
var scope = render(page, {
    videos: [
    ],
    lattice,
    getStyles() {
        return this.videos ? this.videos.map((e, i) => `.photo-${i}{background-image:url('${this.encode(e)}')}`).join("\r\n") : '';
    },
    encode(src) {
        return "http://efront.cc/@/data/xiaohua/photos" + String(src.href).replace(/\.?[^\.]+$/, function (m) {
            return "!" + user.getPassport() + m;
        });
    },
    view(src, index) {
        var elem = picture.apply(null, arguments);
        var head = document.createElement("span");
        var foot = document.createElement("span");
        var update = function (index) {
            foot.innerHTML = `${index + 1}/${src.length}`;
            head.innerHTML = src[index].href;
        };
        update(index);
        on('park')(elem, function (event) {
            var { index } = event;
            update(index);
        });
        var windows = confirm(head, elem, [foot]);
        css(elem, "position:relative;height:500px;width:800px");
        css(windows, "height:600px;width:800px");
    },
    video(element) {
        onclick(element, e => element.play());
        return video(element);
    },
    list
}).$scope;
onappend(page, function () {
    data.setInstance("option-buttons", [{
        icon: "fa-plus",
        name: "添加",
        tip: "",
        do() {
            chooseFile().then(e => upload(e, '/@/data/xiaohua/photos/'));
        },
    },]);
});
onremove(page, function () {
    data.setInstance("option-buttons", []);
})
function main() {

    api("/photos/_find", {
        selector: {
        },
        skip: 0,
        limit: 600,
        "sort": [{ 'year': "desc" }]
    }).success(function (data) {
        scope.videos = data.docs;
    });
    return page;
}