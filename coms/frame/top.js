var page = div();
page.innerHTML = top;
var route = frame$route;
render(page, {
    btn: button,
    user,
    data,
    options: data.getInstance("option-buttons"),
    open(option, params) {
        action(option, null, params).then(function (page) {
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