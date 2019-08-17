function main(bak) {
    var e = bak || document.createElement("back");
    e.innerHTML = back;
    var btn = button(e);
    onclick(btn, function () {
        history.back();
    });
    return btn;
}