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
    encode: encodeurl,
    view(src, index) {
        popup('show', { src, index });
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