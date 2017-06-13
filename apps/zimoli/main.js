"use strict";
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
var createBtn = function (btnName, color) {
    var btnHome = icon(btnName, color);
    css(btnHome, "position:absolute;width:30px;height:30px;left:50%;margin:-15px;top:25px;");
    return btnHome;
};
var createBottomBar = function (buttonsConfig) {
    var bar = createElement(div);
    css(bar, "text-align:center;position:absolute;bottom:0px;height:50px;width:100%;left:0px;right:0px;margin:0;;background-color:#fff;");
    var button_count = 0;
    for (var k in buttonsConfig) button_count++;
    var btnArea = createElement(div);
    css(btnArea, "bottom:0;position:relative;width:" + (100 / button_count) + "%;height:50px;");
    inlineBlock(btnArea);
    maxWidth(btnArea, 100);
    var index = 0;
    for (var k in buttonsConfig) {
        var o = buttonsConfig[k];
        var btn = createElement(btnArea);
        btn.url = o;
        btn.home = createBtn(k, 0x00ff00);
        btn.other = createBtn(k, 0xcccccc);
        var active = btn.active = function (ratio) {
            opacity(this.home, ratio);
            go(this.url, null, this.container);
            return this.container;
        };
        btn.container = createElement(container);
        btn.index = index++;
        onclick(btn, function () {
            var childNodes = btn.parentNode.childNodes;
            for (var cx = 0, dx = childNodes.length; cx < dx; cx++) {
                childNodes[cx] !== this && opacity(childNodes[cx].home, 0);
            }
            page.go(this.index);
        });
        opacity(btn.home, 0);
        appendChild(btn, btn.other, btn.home);
        appendChild(bar, btn);
    }
    bar.childNodes[0].active();
    return bar;
};
var createTitleBar = function () {

    var nav = createElement(div);
    var login = createElement(button);
    var title = createElement(div);
    text(title, document.title);
    text(login, "注册");
    onclick(login, function () {
        go("/login");
    });
    appendChild(nav, title, login);
    css(login, "position:absolute;background-color:#333336;right:0px;top:0;bottom:0;height:100%;width:60px;");
    css(nav, "color:#ffffff;text-align:center;line-height:50px;font-size:24px;background-color:#333336;height:50px;position:absolute;top:0px;left:0px;right:0px;width:100%;");
    return nav;
};
var container = createElement(div);
css(container, "position:absolute;left:0;right:0;top:50px;bottom:50px;width:100%;height:auto;");
var bar = createBottomBar({
    "yuanfen": "/yuanfen/main",
    "nearby": "/nearby/main",
    "broadcast": "/broadcast/main",
    "book": "/book/main",
    "personal": "/personal/main"
});
var nav = createTitleBar();
go.global(nav, "tittlebar");
go.global(bar, "bottombar");
var page = slider(function (index, ratio) {
    var b = bar.childNodes[index];
    return b && b.active(ratio);
});
appendChild(page);
css(page, "position:absolute;left:0;right:0;top:0;bottom:0;width:100%;height:100%;");

function main() {
    return page;
}