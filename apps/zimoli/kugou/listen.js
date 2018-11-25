var page = createVboxWithState(state);
page.innerHTML = listen;

render(page, {
    go,
    btn(a) {
        return button(a, "white");
    }
});

function main() {
    return page;
}