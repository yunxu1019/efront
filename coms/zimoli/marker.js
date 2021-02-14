function marker(e) {
    if (!e) e = document.createElement("marker");
    on("changes")(e, function () {
        e.innerHTML = mark(this.source, this.search);
    });
    return e;
}