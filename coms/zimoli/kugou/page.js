// 中文编码 utf-8
"use strict";
// 备案信息
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
var createBtn = function (btnName, color) {
    var btnHome = icon(btnName, color);
    css(btnHome, "position:absolute;width:30px;height:30px;left:50%;margin:-15px;top:25px;");
    return btnHome;
};
var createBottomBar = function (buttonsConfig) {
    var bar = createElement(div);
    addClass(bar, "bottom-bar");
    var button_count = 0;
    for (var k in buttonsConfig) button_count++;
    var btnArea = createElement(div);
    css(btnArea, "width:" + (100 / button_count) + "%;");
    inlineBlock(btnArea);
    maxWidth(btnArea, 100);
    var index = 0;
    for (var k in buttonsConfig) {
        var o = buttonsConfig[k];
        var btn = createElement(btnArea);
        btn.url = o;
        btn.home = createBtn(k, 0x2a85e2);
        btn.other = createBtn(k, 0xcccccc);
        var active = btn.active = function (ratio) {
            opacity(this.home, ratio);
            go(this.url, null, this.container);
            return this.container;
        };
        btn.container = createElement(div);
        btn.index = index++;
        onclick(btn, function () {
            if (pages.index === this.index) return;
            var childNodes = btn.parentNode.childNodes;
            for (var cx = 0, dx = childNodes.length; cx < dx; cx++) {
                childNodes[cx] !== this && opacity(childNodes[cx].home, 0);
            }
            pages.go(this.index);
        });
        opacity(btn.home, 0);
        appendChild(btn, btn.other, btn.home);
        appendChild(bar, btn);
    }
    return bar;
};
var createTitleBar = function () {

    var nav = createElement(div);
    var login = createElement(button);
    var title = createElement(div);
    text(title, document.title);
    text(login, "注册");
    onclick(login, function () {
        go("/user/login");
    });
    appendChild(nav, title, login);
    css(login, "position:absolute;background-color:#333336;right:0px;top:0;bottom:0;height:100%;width:60px;");
    css(nav, "color:#ffffff;text-align:center;line-height:50px;font-size:24px;background-color:#333336;height:50px;position:absolute;top:0px;left:0px;right:0px;width:100%;");
    return nav;
};
var container = createElement(div);
css(container, "position:absolute;left:0px;right:0px;top:0px;bottom:50px;width:100%;height:auto;");
var bar = createBottomBar({
    "yuanfen": "/yuanfen/main",
    "nearby": "/nearby/main",
    "broadcast": "/broadcast/main",
    "book": "/book/main",
    "personal": "/personal/main"
});
var nav = createTitleBar();
// go.global(nav, "tittlebar");
// go.global(bar, "bottombar");
var pages = div();
ontouchstart(pages, kugou$dragview);
slider(pages, function (index, ratio) {
    if (ratio === 1) {
        state({
            page: index
        });
    }
    var b = bar.childNodes[index];
    return b && b.active(ratio);
});
pages.go(state().page || 0);
var page = createElement(div);
css(pages, "position:absolute;left:0px;right:0px;top:0px;bottom:50px;height:auto;");
appendChild(page, pages, bar);
var menu = list(function (index) {
    var buttons = [
        "更换主页"
    ];
    if (index >= buttons.length) return false;
    var label = button(buttons[index]);
    onclick(label, function () {
        menu.blur();
        var pages = [
            `/user/register`,
            `/user/login`,
            `/kugou/home`,
            `/baotu/home`,
            `/main`
        ];
        var scope = {
            go(index) {
                go(pages[index]);
            }
        };
        var body = list(function (index) {
            var pageTitles = [
                `注册`,
                `登录`,
                `酷狗`,
                `包图网`,
                `欢迎屏幕`
            ];
            if (index >= pageTitles.length) return;
            var item = div();
            html(item, pageTitles[index]);
            attr(item, "ng-click", `go(${index})`);
            render(item, scope);
            return item || false;
        });
        body.go(0);
        confirm("<b>请选择主页</b>", body);
    });
    return label || false;
});
css(menu, "width:200px;height:100px;");
css("body", "background-color:#000");
menu.go(0);
contextmenu(page, menu);
extend(kugou$dragview, {
    page, pages
});
