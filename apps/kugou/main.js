var page = createElement(div);

var tags = "新歌:song/list:音乐总有新玩法,排行:rank/list:排行榜 - 酷狗音乐,歌单:plist/list:歌单 - 酷狗音乐,歌手:singer/keywords:歌手分类 - 酷狗音乐".split(",").map(function (tag, cx) {
    var [str, url, title] = tag.split(":");
    var label = createElement(div);
    label.active = function (ratio) {
        go(this.url, null, this.container);
        if (ratio === 1) {
            document.title = label.title;
            if (tags.active === this) return this.container;
            if (tags.active) removeClass(tags.active, "active");
            addClass(this, "active");
            tags.active = this;
        }
        return this.container;
    };
    label.title = title;
    label.url = url;
    label.container = createElement(div);
    onclick(label, function () {
        pages.go(cx);
    });
    text(label, str);
    return label;
});
var pages = slider(function (index, ratio) {
    if (ratio === 1) {
        state({
            page: index
        });
    }
    var tag = tags[index];
    return tag && tag.active(ratio);
});
pages.go(state().page || 0);
onappend(page, function () {
    tags.active && (document.title = tags.active.title);
});
addClass(pages, "pages");
var titleBar = createElement(div);
addClass(titleBar, "title-bar");
appendChild(titleBar, tags);
appendChild(page, pages, titleBar);
function main() {
    return page;
}