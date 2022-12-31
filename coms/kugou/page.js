// 中文编码 utf-8
"use strict";
// 备案信息
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
var createBottomBar = function (buttonsConfig) {
    var bar = document.createElement("div");
    addClass(bar, "bottom-bar");
    var button_count = 0;
    for (var k in buttonsConfig) button_count++;
    var btnArea = document.createElement("div");
    css(btnArea, "width:" + (100 / button_count) + "%;");
    maxWidth(btnArea, 100);
    var line = btnArea.cloneNode();
    inlineBlock(btnArea);
    var active = function (ratio) {
        if (ratio >= .6) {
            if (bar.active !== this) {
                bar.active && removeClass(bar.active, "active");
                addClass(this, "active");
                bar.active = this;
                search_btn.getElementsByTagName("info")[0].innerHTML = this.searchInfo;
            }
        }
        css(line, { left: ((-button_count / 2 + pages.index) * this.offsetWidth) + "px" });
        go(this.url, null, this.container);
        return this.container;
    };
    var index = 0;
    for (var k in buttonsConfig) {
        var [url, info] = buttonsConfig[k].split(":");
        var btn = btnArea.cloneNode();
        btn.url = url;
        btn.searchInfo = info;
        btn.active = active;
        btn.container = document.createElement("div");
        btn.index = index++;
        btn.innerHTML = k;
        onclick(btn, function () {
            if (pages.index === this.index) return;
            var childNodes = btn.parentNode.childNodes;
            for (var cx = 0, dx = childNodes.length; cx < dx; cx++) {
                childNodes[cx] !== this && setOpacity(childNodes[cx].home, 0);
            }
            pages.go(this.index);
        });
        appendChild(bar, btn);
    }
    addClass(line, "line");
    appendChild(bar, line);
    return bar;
};
var bar = createBottomBar({
    [i18n("我", "Mine")]: "/kugou/mine:搜索",
    [i18n("听", "Listen")]: "/kugou/listen:搜索",
    [i18n("看", "Watch")]: "/kugou/view:请输入房间号、主播昵称",
    [i18n("唱", "Sing")]: "/kugou/sing:今天想唱什么歌",
});
var menu_btn = button("", "left");
menu_btn.innerHTML='<i>&#xe6d4;</i>';
onclick(menu_btn, kugou$dragview.toChange);
var plus_btn = button("", "right");
plus_btn.innerHTML = '<i>&#xe632;</i>';
select(plus_btn, kugou$plusmenu());
var search_btn = button("", "search");
search_btn.innerHTML = '<i>&#xe60d;</i> <info>搜索</info>';
onclick(search_btn, function () {
    go("/kugou/search");
});
appendChild(bar, menu_btn, plus_btn, search_btn);
var pages = div();
ontouchstart(pages, kugou$dragview);
onmousedown(pages, kugou$dragview);
slider(pages, function (index, ratio) {
    if (index + 4 >= bar.childNodes.length) return;
    if (ratio === 1) {
        state({
            page: index
        });
    }
    var b = bar.childNodes[index];
    return b && b.active(ratio);
});
onappend(pages, function () {
    var index = state().page;
    if (!isFinite(index)) index = 1;
    pages.go(index);
});
var page = document.createElement("div");
appendChild(page, pages, bar);
ontouchstart(page, kugou$dragview);
onmousedown(page, kugou$dragview);
onclick(page, e => e.target === page && kugou$dragview.isRight && kugou$dragview.toLeft());
extend(kugou$dragview, {
    page, pages
});
