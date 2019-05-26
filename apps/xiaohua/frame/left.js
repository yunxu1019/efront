var page = div();
page.innerHTML = left;
render(page, {
    ylist: menu,
    btn: button,
    go,
    open(event) {
        go(event.item.href);
    },
    menus: data.asyncInstance('menus'),
});
function main() {
    return page;
}