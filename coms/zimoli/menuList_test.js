function main() {
    var page = div();
    page.innerHTML = menuList_test;
    page.setAttribute("mode", 'vertical');
    return menu(page);
}