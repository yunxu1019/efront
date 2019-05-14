var page = div();
page.innerHTML = left;
render(page, {
    ylist: menu,
    menus: data.asyncInstance('menus'),
});
function main() {
    return page;
}