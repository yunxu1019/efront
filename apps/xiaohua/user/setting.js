var page = createVboxWithState(state);
page.innerHTML = setting;
render(page, {
    opt: option,
    go,
    logout() {
        user.Logout();
    }
});
page.initialStyle = {
    marginLeft: "100%",
    zIndex: 2
};
function main() {
    return page;
}