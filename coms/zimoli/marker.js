var b = function (match) {
    var b = document.createElement('b');
    b.innerText = match;
    return b;
};
var wrap = function (pre, match, aft) {
    return [].concat(pre, b(match), aft);
};
function marker(e) {
    if (!e) e = document.createElement("marker");
    on("changes")(e, function () {
        remove(e.childNodes);
        if (isEmpty(this.source)) return;
        var source = mark(this.source, this.search, wrap);
        if (isArray(source)) appendChild(this, source);
        else this.innerText = source;
    });
    return e;
}
marker.wrap = wrap;