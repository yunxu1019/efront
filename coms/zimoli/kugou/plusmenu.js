var menu = div();
menu.innerHTML = plusmenu;
render(menu, {
    btn(elem) {
        return button(elem, "white");
    }
})
function main() {
    return menu;
}