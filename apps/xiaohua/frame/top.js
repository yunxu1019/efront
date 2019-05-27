var page = div();
page.innerHTML = top;
render(page, {
    btn: button,
    user,
    logout() {
        user.Logout();
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