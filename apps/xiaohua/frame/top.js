var page = div();
page.innerHTML = top;
render(page, {
    btn: button,
    user,
    options: data.getInstance("option-buttons"),
    open(option) {
        action(option);
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