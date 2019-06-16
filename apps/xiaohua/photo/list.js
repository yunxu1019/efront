var page = createVboxWithState(state);
page.innerHTML = list;
var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
var stylesheet = page.querySelector("style");
var scope = render(page, {
    videos: [
    ],
    lattice,
    getStyles() {
        return this.videos ? this.videos.map((e, i) => `.photo-${i}{background-image:url('${this.encode(e.href)}')}`).join("\r\n") : '';
    },
    encode(src) {
        return "/@/data/xiaohua/photos" + src.replace(/\.?[^\.]+$/, function (m) {
            passport = encode62.timeupdate(passport);
            return "!" + passport + m;
        });
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
        path: '/photo/edit'
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
        limit: 21,
        "sort": [{ 'year': "desc" }]
    }).success(function (data) {
        scope.videos = data.docs;
    });
    return page;
}