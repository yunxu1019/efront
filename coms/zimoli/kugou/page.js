// 中文编码 utf-8
"use strict";
// 备案信息
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
var createBottomBar = function (buttonsConfig) {
    var bar = createElement(div);
    addClass(bar, "bottom-bar");
    var button_count = 0;
    for (var k in buttonsConfig) button_count++;
    var btnArea = createElement(div);
    css(btnArea, "width:" + (100 / button_count) + "%;");
    var line = createElement(btnArea);
    inlineBlock(btnArea);
    maxWidth(btnArea, 100);
    var active = function (ratio) {
        if (ratio >= .6) {
            if (bar.active !== this) {
                bar.active && removeClass(bar.active, "active");
                addClass(this, "active");
                bar.active = this;
            }
        }
        css(line, { left: pages.index * this.offsetWidth + "px" });
        go(this.url, null, this.container);
        return this.container;
    };
    var index = 0;
    for (var k in buttonsConfig) {
        var o = buttonsConfig[k];
        var btn = createElement(btnArea);
        btn.url = o;
        btn.active = active;
        btn.container = createElement(div);
        btn.index = index++;
        btn.innerHTML = k;
        onclick(btn, function () {
            if (pages.index === this.index) return;
            var childNodes = btn.parentNode.childNodes;
            for (var cx = 0, dx = childNodes.length; cx < dx; cx++) {
                childNodes[cx] !== this && opacity(childNodes[cx].home, 0);
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
    "听": "/kugou/listen",
    "看": "/kugou/view",
    "唱": "/kugou/sing",
});
var pages = div();
ontouchstart(pages, kugou$dragview);
ontouchstart(bar, kugou$dragview);
slider(pages, function (index, ratio) {
    if (index + 1 >= bar.childNodes.length) return;
    if (ratio === 1) {
        state({
            page: index
        });
    }
    var b = bar.childNodes[index];
    return b && b.active(ratio);
});
onappend(pages, function () {
    pages.go(state().page || 0);
});
var page = createElement(div);
appendChild(page, pages, bar);
extend(kugou$dragview, {
    page, pages
});
