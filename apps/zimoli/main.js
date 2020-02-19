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
var view = layer$leftCenter(menu);
menu.initialStyle = "transform:scale(.92)";
css(menu, "background-image: linear-gradient(0deg, #0b3b5d, 5%, #031341, 90%, #235b71);height:100%;width:100%");
css("body", "background:url('images/background.jpg') no-repeat;background-size:cover;");
css(":after,:before,*", "box-sizing:border-box;");
css(".titlebar", { backgroundColor: "rgb(44, 162, 249,.7)" });
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
cross.digest = render.digest;
user.setLoginPath("/user/welcome");
var mainView = function () {
    return view;
};

user.setUserDataLoader(function () {
    api("get", "/_users/" + user._id).success(function (result) {
        for (var k in user) {
            if (!(user[k] instanceof Function)) {
                delete user[k];
            }
        }
        extendIfNeeded(user, result);
        user.avatarref = `${cross.getCrossUrl(config.api_base)}_users/${result._id}/avatar?rev=${result._rev}`;
        if (result._attachments && result._attachments.avatar) {
            user.avatar = user.avatarref;
        } else {
            user.avatar = '';
        }
    });
});
var main = new Promise(function (ok, oh) {
    var logout = function () {
        user.Logout().then(function () {
            ok(mainView);
        }).catch(function () {
            ok(mainView);
        });
    };
    user.loadSession().then(function (session) {
        if (!session) return ok(mainView);
        cross.addCookie(session, config.api_domain);
        api("get", "_session").success(function (result) {
            if (result.ok && result.userCtx && result.userCtx.name) {
                ok(mainView);
            } else {
                logout();
            }
        }).error(function (error) {
            logout();
            alert.error(JSON.parse(error).reason);
        });
    });
});