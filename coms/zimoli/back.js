function main() {
    var btn = button(back);
    onclick(btn, function () {
        history.back();
    });
    return btn;
}