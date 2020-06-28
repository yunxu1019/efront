var page = div();
page.innerHTML = left;
render(page, {
    ylist: menu,
    btn: button,
    go,
    user,
    menus: route,
});
function main() {
    return page;
}