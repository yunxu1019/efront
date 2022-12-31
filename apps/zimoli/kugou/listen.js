var page = createVboxWithState(state);
page.innerHTML = listen;

var _images = [];

render(page, {
    go,
    user,
    slider() {
        return null;
    },
    btn(a) {
        return button(a, "white");
    }
});

function main() {
    return page;
}