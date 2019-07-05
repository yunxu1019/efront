var page = div();
page.innerHTML = top;
render(page, {
    btn: button,
    user,
    options: data.getInstance("option-buttons"),
    open(option) {
        if (option.path) {
            var elem = popup("#" + option.path, option);
            css(elem, {
                width: "300px",
                height: '200px'
            });
            drag.on(elem);
        }
    },
    logout() {
        user.Logout().then(function () {
            zimoli.switch();
            zimoli();
        });
    },
    input() {
        return input();
    },
    switchMenu() {
        page.parentNode.switchLeft();
    }
})
var isOpend = false;
var mouseover = function () {
};
page.querySelectorAll("menu-item");
function main() {
    return page;
}