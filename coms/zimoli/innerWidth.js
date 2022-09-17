var document = this.document;
function innerWidth() {
    if (isFinite(window.innerWidth)) return window.innerWidth;
    return document.documentElement.offsetWidth || document.body && document.body.offsetWidth;
}
innerWidth.toString = function () {
    return this().toString();
};
innerWidth.valueOf = function () {
    return this();
};