var page = createVboxWithState(state);
page.innerHTML = list;
var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));

var scope = render(page, {
    videos: [
    ],
    encode(src) {
        return "/@/data/xiaohua/videos" + src.replace(/\.?[^\.]+$/, function (m) {
            passport = encode62.timeupdate(passport);
            return "!" + passport + m;
        });
    },
    img(e) {
        e.setAttritute("dragable", false);
        return e;
    },
    "a-video":video,
    list
}).$scope;
function main() {
    api("/videos/_find", {
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