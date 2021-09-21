var menu = div();
menu.innerHTML = plusmenu;
render(menu, {
    go,
    btn(elem) {
        return button(elem, "white");
    }
});
function main() {
    return menu;
}