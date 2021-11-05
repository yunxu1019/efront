var page = document.createElement("都说我负天下人_可你们天下人_又何曾善待过我");
page.innerHTML = left;
if (!user.avatar) user.avatar = "user/avatar.png";
render(page, {
    ylist: menu,
    btn: button,
    go,
    user,
    avatar,
    popup,
    menus: frame$route,
});
on('append')(page, function () {
    frame$route.open();
});
function main() {
    return page;
}