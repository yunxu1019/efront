titlebar("个人中心");
var avatar = createElement(div);
css(avatar, "border-radius:50%;background-color:#ccc;width:60px;height:60px;");
var avatarArea = createElement(div, avatar);
css(avatarArea, "width:100%;height:120px;background-color:#fff;");
var page = createVboxWithState(state);
page.innerHTML = profile;
render(page, {
    user,
    group,
    avatar() {
        return avatarArea;
    },
    go,
    option(elem) {
        return option(elem.title, elem.getAttribute("content"), 96);
    },
    logout() {
        user.Logout().then(e => go(0));
    }
})
// appendChild(page, beian, tbar, money_about, life_circle, live_connect, recived_gift, id_account, setting_about);
css(page, "font-size:40px;color:#fff;");
page.initialStyle = "margin-left:100%;z-index:1;transition:all .2s ease-out";
login();
function main() {
    return page;
}