if (!user.avatar) user.avatar = "user/avatar.png";
function main() {
    var page = document.createElement("都说我负天下人_可你们天下人_又何曾善待过我");
    page.innerHTML = template;
    var { head, foot, header = head, footer = foot } = this;
    render(page, extend({
        ylist: menu,
        btn: button,
        go,
        user,
        avatar,
        header,
        footer,
        popup,
        menus: frame$route,
    }, this));
    on('append')(page, function () {
        frame$route.open();
    });
    return page;
}