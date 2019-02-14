var page = createVboxWithState(state);
page.innerHTML = mine;

render(page, {
    go,
    user,
    group,
    option(node) {
        var [head, body, foot] = node.children;
        var opt = option(head, body, foot || true, 120);
        return opt;
    },

    btn(a) {
        return button(a, "white");
    }
});

function main() {
    return page;
}