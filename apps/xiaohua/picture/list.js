var page = createVboxWithState(state);
page.innerHTML = list;
var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
var scope = render(page, {
    videos: [
    ],
    encode(src) {
        return "/@/data/xiaohua/images" + src.replace(/\.?[^\.]+$/, function (m) {
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
function main() {
    api("/images/_find", {
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