function menu(buttons) {
    var menu_box = lattice(buttons, 100);
    onappend(menu_box, function () {
        menu_box.go(0);
    });
    return menu_box;
}