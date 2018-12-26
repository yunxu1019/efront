// 中文编码 utf-8
"use strict";
var menu = div();
appendChild(menu, kugou$menu, kugou$page, beian);
i18n.loadSource({
    zh: {
        "name": "用户名"
    },
});
i18n = i18n.local({
    zh: {
        badDevice: "运行环境不佳，可能出现卡顿现象！"
    },
    en: {
        badDevice: "Operating environment is not good, there may be a Katon phenomenon! uuuuuuuuuuu"
    }
});
var _state = state();
if (_state.isRight) {
    kugou$dragview.toRight();
}
kugou$dragview.onchange = function () {
    _state.isRight = kugou$dragview.isRight;
    state(_state);
};
if (modules.IS_BAD_DEVICE) alert.warn(i18n`badDevice`);
var view = layer$leftCenter(menu);
menu.initialStyle = "transform:scale(.92)";
css(menu, "background-image: linear-gradient(0deg, #0b3b5d, 5%, #031341, 90%, #235b71);height:100%;width:100%");
css("body", "background:url('images/background.jpg') no-repeat;background-size:cover;");
css(":after,:before,*", "box-sizing:border-box;");
css(".titlebar", { backgroundColor: "rgb(44, 162, 249)" });
zimoli.setStorage(localStorage);
api.setBaseUrl(config.api_base, cross);
api.setHeaders({}, false);
api.onerror = function (error) {
    try {
        error = JSON.parse(error).reason
    } catch (e) {
    }
    alert.error(i18n(error));
};
api.setLazyRender(render.refresh);
user.setLoginPath("/user/welcome");
user.setStateFunction(state);
user.loadSession().then(function (session) {
    cross.addCookie(session, config.api_domain);
});
function main() {
    return view;
}