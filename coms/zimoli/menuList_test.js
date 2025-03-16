function main() {
    var page = div();
    page.innerHTML = menuList_test;
    page.setAttribute("mode", 'vertical');
    css(page, "width:180px");
    return menu(page);
}