var page = div();
page.initialStyle = 'transform:scale(.9);opacity:0;';
var tags = "新歌:song/list:音乐总有新玩法,排行:rank/list:排行榜 - 酷狗音乐,歌单:plist/list:歌单 - 酷狗音乐,歌手:singer/keywords:歌手分类 - 酷狗音乐".split(",").map(function (tag, cx) {
    var [str, url, title] = tag.split(":");
    var label = createElement(div);
    label.active = function (ratio) {
        if (label.needactive) {
            delete label.needactive;
            go(this.url, null, this.container);
        }
        if (ratio === 1) {
            document.title = label.title;
            if (tags.active === this) return this.container;
            tags.active = this;
            render.refresh();
        }
        return this.container;
    };
    label.needactive = true;
    label.title = title;
    label.url = url;
    label.container = div();
    label.index = cx;
    text(label, str);
    return label;
});
onappend(page, function () {
    tags.active && (document.title = tags.active.title);
});
page.innerHTML = home;
render(page, {
    go,
    tags,
    tag: button,
    btn: button,
    input,
    slider(elem) {
        var pages = slider(elem, function (index, ratio) {
            if (ratio === 1) {
                state({
                    page: index
                });
            }
            var tag = tags[index];
            return tag && tag.active(ratio);
        });
        pages.go(state().page || 0);
        return pages;
    }
});
function main() {
    return page;
}