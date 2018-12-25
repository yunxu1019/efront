var page = createVboxWithState(state);
page.innerHTML = listen;

render(page, {
    go,
    user,
    btn(a) {
        return button(a, "white");
    }
});

function main() {
    return page;
}