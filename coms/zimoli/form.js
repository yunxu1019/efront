function form(elem) {
    if (!elem) {
        elem = document.createElement("form");
    }
    if (/form/i.test(elem.tagName)) {
        on("submit")(elem, function (event) {
            event.preventDefault();
        });
    }
    return elem;
}