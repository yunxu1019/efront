var page = div();
page.innerHTML = top;
render(page, {
    btn: button,
    user,
    data,
    options: data.getInstance("option-buttons"),

    open(option) {
        action(option).then(function (page) {
            if (isNode(page)) {
                on("submitted")(page, function () {
                    route.reload();
                });
            }
        });
    },
    logout() {
        user.Logout();
    },
    fullscreen,
    alert,
    route,
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