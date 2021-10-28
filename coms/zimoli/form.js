function form(elem) {
    if (!elem) {
        elem = document.createElement("form");
    }
    if (/form/i.test(elem.tagName)) {
        on("submit")(elem, function (event) {
            event.preventDefault();
            var fields = elem.querySelectorAll(".field");
            for (var f of fields) f.checked = true;
            render.refresh();
        });
    }
    return elem;
}