var page = div();
page.innerHTML = left;
var route = frame$route;
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