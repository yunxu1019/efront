var b = function (match, isFullmatch) {
    var b = document.createElement('b');
    b.innerText = match;
    if (isFullmatch) b.setAttribute('fullmatch', '');
    return b;
};
var wrap = function (pre, match, aft, search) {
    return [].concat(pre, b(match, match.length === search.length), aft);
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