var page = div();
var routes = frame$route.from("data/menus.yml");
page.innerHTML = left;
render(page, {
    ylist: menu,
    btn: button,
    go,
    open(event) {
        console.log(event)
        this.menus.open(event)
        // go(event.value.href);
    },
    menus: routes,
});
function main() {
    return page;
}